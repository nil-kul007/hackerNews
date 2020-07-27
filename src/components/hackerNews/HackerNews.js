import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Chart } from 'react-charts';
import { imagePath } from '../../utils/assetUtils';
import { hnAPI } from '../../api';
import { useServerData } from '../../state/serverDataContext';
import TableHeader from '../tableHeader/TableHeader';

const HackerNews = props => {
  const serverNews = useServerData(data => {
    return data.news || [];
  });
  const [news, setNews] = useState([serverNews]);
  const [rawData, setRawData] = useState(serverNews.hits);
  const [isLoading, steLoading] = useState(false);
  let currentPage =
    props.match.params && props.match.params.id
      ? Number(props.match.params.id)
      : 1;
  let navNext = currentPage + 1;
  let navPrevious = currentPage > 1 ? currentPage - 1 : 1;

  function getPageDetails(currentPage) {
    setRawData([]);
    steLoading(true);
    news.map(item => {
      if (Number(item.page) === currentPage) {
        setRawData(item.hits);
        steLoading(false);
      } else {
        hnAPI.news.all(currentPage).then(data => {
          if (data.hits.length > 0) {
            setNews([...news, { ...data }]);
            setRawData(data.hits);
            steLoading(false);
          }
        });
      }
    });
  }

  let response = [];
  rawData &&
    response.push(
      rawData.map(item => {
        return [item.objectID ? item.objectID : 'N/A', item.points];
      })
    );

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  );

  const lineChart = (
    <div
      style={{
        width: '100%',
        height: '300px'
      }}
    >
      <Chart data={response} axes={axes} />
    </div>
  );

  const updateVote = objectID => {
    let updatedData = [];
    rawData.map(item => {
      if (item.objectID === objectID) {
        updatedData.push({
          ...item,
          points: item.points ? Number(item.points) + 1 : 1
        });
      } else {
        updatedData.push(item);
      }
    });
    setRawData(updatedData);
  };

  function removeParam(parameter) {
    let url = new URL(parameter);
    return url.origin;
  }

  function hideRow(objectID) {
    let newsDetails = [];
    rawData.map(item => {
      if (item.objectID === objectID) {
        newsDetails.push({
          ...item,
          hide: true
        });
      } else {
        newsDetails.push(item);
      }
    });
    setRawData(newsDetails);
  }

  return (
    <div className="hacker-news">
      <h1 className="hn-title">Hacker news page</h1>
      <table>
        <thead>
          <TableHeader />
        </thead>
        <tbody>
          {isLoading ? <h3 className="text-center">Loading...</h3> : null}
          {rawData &&
            rawData.map((item, i) => {
              if (!item.hide) {
                return (
                  <tr key={i}>
                    <td className="text-center">
                      {item.num_comments ? item.num_comments : 0}
                    </td>
                    <td className="text-center">
                      {item.points ? item.points : 0}
                    </td>
                    <td
                      onClick={() => {
                        updateVote(item.objectID);
                      }}
                    >
                      <img
                        width="10px"
                        className="upvote"
                        src={imagePath('arrow-up.png')}
                        alt="Up Vote"
                      />
                    </td>
                    <td>
                      {item._highlightResult.title.value}
                      <span className="url-link">{`  ( ${item.url &&
                        removeParam(item.url)} ) By ${item.author} `}</span>
                      <span
                        class="hide"
                        onClick={() => {
                          hideRow(item.objectID);
                        }}
                      >
                        [ hide ]
                      </span>
                    </td>
                  </tr>
                );
              }
            })}
        </tbody>
      </table>

      <nav className="navigation" aria-label="navigation">
        <NavLink
          exact
          to={`/HackerNews/${navPrevious}`}
          onClick={() => {
            getPageDetails(navPrevious);
          }}
          activeClassName="active"
        >
          Previous
        </NavLink>{' '}
        <NavLink
          exact
          to={`/HackerNews/${navNext}`}
          onClick={() => {
            getPageDetails(navNext);
          }}
          activeClassName="active"
        >
          Next
        </NavLink>
      </nav>

      <div className="line-chart">{lineChart}</div>
    </div>
  );
};
HackerNews.fetchData = () => {
  return hnAPI.news.all(1).then(news => {
    return {
      news
    };
  });
};

export default HackerNews;

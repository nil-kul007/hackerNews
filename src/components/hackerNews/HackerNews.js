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
  const [rawData, setRawData] = useState(serverNews.hits);
  let navNext;
  let navPrevious;
  if (props.match.params && props.match.params.id) {
    if (props.match.params.id <= 1) {
      navPrevious = '/HackerNews/';
    }
    navPrevious = '/HackerNews/' + (Number(props.match.params.id) - 1);
    navNext = '/HackerNews/' + (Number(props.match.params.id) + 1);
  } else {
    navPrevious = '/HackerNews/';
    navNext = '/HackerNews/2';
  }
  let response = [];
  rawData &&
    response.push(
      rawData.map(item => {
        return [item.story_id ? item.story_id : 'N/A', item.points];
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
    // A react-chart hyper-responsively and continuously fills the available
    // space of its parent element automatically
    <div
      style={{
        width: '100%',
        height: '300px'
      }}
    >
      <Chart data={response} axes={axes} />
    </div>
  );

  const updateVote = story_id => {
    let updatedData = [];
    rawData.map(item => {
      if (item.story_id === story_id) {
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

  return (
    <div className="hacker-news">
      <h1 className="hn-title">Hacker news page</h1>
      <table>
        <thead>
          <TableHeader />
        </thead>
        <tbody>
          {rawData &&
            rawData.map((item, i) => {
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
                      console.log('Clicking me', item);
                      updateVote(item.story_id);
                    }}
                  >
                    <img
                      width="10px"
                      className="upvote"
                      src={imagePath('arrow-up.png')}
                      alt="Up Vote"
                    />
                  </td>
                  <td>{item.story_title}</td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <nav className="navigation" aria-label="navigation">
        <NavLink exact to={navPrevious} activeClassName="active">
          Previous
        </NavLink>{' '}
        <NavLink exact to={navNext} activeClassName="active">
          Next
        </NavLink>
      </nav>

      <div>{lineChart}</div>
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

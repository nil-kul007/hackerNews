import React from 'react';
import { Helmet } from 'react-helmet';

const Head = () => {
  return (
    <Helmet>
      <title>Hacker News</title>

      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="description"
        content="Hacker News clone using React with Server Side Rendering"
      />

      <link
        rel="shortcut icon"
        href={`${process.env.PUBLIC_URL}/favicon.ico?v1`}
      />
    </Helmet>
  );
};

export default Head;

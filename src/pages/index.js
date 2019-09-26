import React from 'react';
import Layout from 'components/layout';
import portfolioData from '../json/data.json';

export default () => {
  console.log(portfolioData);
  return (
    <Layout>
      <div className='label'>Website is currently under construction.</div>
      <div className='content'>
        <p>
          My name is Hendhy Hutomo,
          <wbr /> I&nbsp;am a digital creative based in Jakarta, Indonesia. I
          make websites, apps, motion graphics & brand identities.
        </p>
        <p>
          Since 2015, <wbr />
          I&nbsp;have contributed to: <wbr />
          {portfolioData.map((data, id) => {
            let printout;
            if (data.link === null) {
              printout = (
                <span key={id}>
                  {' '}
                  {data.name}
                  {id !== portfolioData.length - 1 ? ',' : ''}
                </span>
              );
            } else {
              printout = (
                <span key={id}>
                  {' '}
                  <a href={data.link} target='_blank' rel='noopener noreferrer'>
                    {data.name}
                  </a>
                  {id !== portfolioData.length - 1 ? ',' : ''}
                </span>
              );
            }
            return printout;
          })}{' '}
          and&nbsp;many more&nbsp;—
        </p>
        <p>
          Say hello, <wbr />
          <a
            href='mailto:hello@hendhyhutomo.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            hello@hendhyhutomo.com
          </a>
          .
        </p>
      </div>
    </Layout>
  );
};

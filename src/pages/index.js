import React from 'react';
import Layout from 'components/layout';
import portfolioData from '../json/data.json';

const IndexPage = () => {
  // console.log(portfolioData);
  return (
    <Layout>
      <div className='label'>
        Currently building a creative powerhouse at{' '}
        <a
          href='/tomostudio-portfolio-2020.pdf'
          target='_blank'
          rel='noopener noreferrer'
        >
          tomo studio
        </a>{' '}
        & <br />a human centric startup, AtOnce.
      </div>
      <div className='content'>
        <p>
          My name is Hendhy Hutomo,
          <wbr /> I&nbsp;am a creative director and engineer based in Jakarta,
          Indonesia. I make websites, apps, motion & identities.
        </p>
        <p>
          Since 2015, <wbr />
          I&nbsp;have made contribution to: <wbr />
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
          Say <wbr />
          <a
            href='mailto:hello@hendhyhutomo.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            hello@hendhyhutomo.com
          </a>{' '}
          or{' '}
          <a
            href='mailto:hendhy@tomostudio.id'
            target='_blank'
            rel='noopener noreferrer'
          >
            hendhy@tomostudio.id
          </a>.
        </p>
      </div>
    </Layout>
  );
};

export default IndexPage;
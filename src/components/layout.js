import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import 'stylesheet/main.scss';
import { Helmet } from 'react-helmet';
// import PageTransition from 'gatsby-plugin-page-transitions';

export default class Layout extends React.Component {
	componentDidMount() {
		ContainerFunction.init();
	}
	componentWillUnmount() {
		ContainerFunction.exit();
	}
	render() {
		const props = this.props;
		return (
			<StaticQuery
				query={graphql`
					query {
						site {
							siteMetadata {
								title
								siteUrl
							}
						}
					}
				`}
				render={(data) => {
					const webname = data.site.siteMetadata.title;
					const siteurl = data.site.siteMetadata.siteUrl;
					const seo = {
						desc: '',
						keywords: '',
						image: '',
						url: siteurl
					};
					return (
						<div id="Container">
							<div id="Background" />
							<Helmet>
								<title>{props.titleText ? `${props.titleText} | ${webname}` : webname}</title>
								<meta name="description" content={seo.desc} />
								<meta name="keywords" content={seo.keywords} />
								{seo.image && <meta name="image" content={seo.image} />}
								{seo.url && <meta property="og:url" content={seo.url} />}
								{props.titleText ? (
									<meta property="og:title" content={`${props.titleText} | ${webname}`} />
								) : (
									<meta property="og:title" content={webname} />
								)}
								{seo.desc && <meta property="og:description" content={seo.desc} />}
								{seo.image && <meta property="og:image" content={seo.image} />}
								<meta name="twitter:card" content="summary_large_image" />

								{props.titleText ? (
									<meta property="twitter:title" content={`${props.titleText} | ${webname}`} />
								) : (
									<meta property="twitter:title" content={webname} />
								)}
								{seo.desc && <meta name="twitter:description" content={seo.desc} />}
								{seo.image && <meta name="twitter:image" content={seo.image} />}
							</Helmet>
							{props.children}
						</div>
					);
				}}
			/>
		);
	}
}

const ContainerFunction = {
	init: () => {
		ContainerFunction.resizeAdd();
		ContainerFunction.mouseMoveAdd();
	},
	exit: () => {
		ContainerFunction.mouseMoveRemove();
		ContainerFunction.resizeRemove();
	},
	resize: () => {
		if (typeof document !== `undefined`) {
			document.querySelector('div#Container').style.minHeight = window.innerHeight.toString() + 'px';
		}
	},
	resizeInit: false,
	resizeAdd: () => {
		if (typeof window !== `undefined`) {
			if (!ContainerFunction.resizeInit) {
				ContainerFunction.resizeInit = true;
				window.addEventListener('resize', ContainerFunction.resize, { passive: true });
			}
		}
	},
	resizeRemove: () => {
		if (typeof window !== `undefined`) {
			ContainerFunction.resizeInit = false;
			window.removeEventListener('resize', ContainerFunction.resize, { passive: true });
		}
	},
	mouseMove: (event) => {
		if (!('ontouchstart' in document.documentElement)) {
			const center = { X: window.innerWidth / 2, Y: window.innerHeight / 2 };
			const radian = Math.atan2(event.clientY - center.Y, event.clientX - center.X);
			const deg = Math.floor((radian * 180 / Math.PI + 180) * 100) / 100;
			// const color1 = `#333 0%`;
			// const color2 = `#000 100%`;
			// const linearGrad = `linear-gradient( ${deg}deg, ${color1} , ${color2} )`;
			// document.querySelector('div#Container #Background').style.background = linearGrad;
			const MaxDistance = Math.sqrt(center.Y * center.Y + center.X * center.X);
			let distance = Math.sqrt(
				(event.clientX - center.X) * (event.clientX - center.X) +
					(event.clientY - center.Y) * (event.clientY - center.Y)
			);
			let scale = 1 + 0.75 * (Math.floor(distance / MaxDistance * 10) / 10);
			const transformScale = ` scale( ${scale}, ${scale}) `;
			const rotateScale =  ` rotate(${deg}deg) `;
			document.querySelector('div#Container #Background').style.transform = transformScale + rotateScale;
		}
	},
	mouseMoveInit: false,
	mouseMoveAdd: () => {
		if (typeof window !== `undefined`) {
			if (!ContainerFunction.mouseMoveInit) {
				ContainerFunction.mouseMoveInit = true;
				window.addEventListener('mousemove', ContainerFunction.mouseMove, { passive: true });
			}
		}
	},
	mouseMoveRemove: () => {
		if (typeof window !== `undefined`) {
			ContainerFunction.mouseMoveInit = false;
			window.removeEventListener('mousemove', ContainerFunction.mouseMove, { passive: true });
		}
	}
};

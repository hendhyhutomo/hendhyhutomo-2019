import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import 'stylesheet/main.scss';
import { Helmet } from 'react-helmet';

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
		ContainerFunction.deviceMotion();
		setTimeout(() => {
			if (typeof document !== `undefined`) {
				document.body.classList.remove('loading');
			}
		}, 500);
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
	deviceMotion: () => {
		const listener = (event) => {
			if (typeof document !== `undefined`) {
				document.body.classList.add('hasgyro');
			}
			let { gamma, beta } = event;
			// gamma = gamma; // Y
			// const radian = Math.atan2(beta, gamma);
			// const deg = Math.floor((radian * 180 / Math.PI + 180) * 100) / 100;
			// const transformRotate = ` rotate(${deg}deg) `;

			const MaxDistance = Math.sqrt(45 * 45 + 45 * 45);
			let distance = Math.sqrt(gamma * gamma + beta * beta);
			let scale = 1 + 0.25 * (Math.floor(distance / MaxDistance * 10) / 10);
			const transformScale = ` scale( ${scale}, ${scale}) `;

			const drag = 0.75;
			let translateX = - Math.floor((gamma) / 180 * drag * 100);
			let translateY =  - Math.floor((beta) / 180 * drag * 100);

			if(!window.matchMedia("(orientation: portrait)").matches){
				translateX = - Math.floor((beta) / 180 * drag * 100);
				if(window.orientation > 0){
					translateY =  Math.floor((gamma) / 180 * drag * 100);
				}
				else{
					translateY =  - Math.floor((gamma) / 180 * drag * 100);
				}
			}
			translateX = translateX - 5;
			translateY = translateY + 7.5;
			const transformTranslate = ` translate( ${translateX}%, ${translateY}%) `;
			// console.log(`X: ${translateX} ${ Math.floor(gamma)} , Y: ${translateY} ${ Math.floor(beta)}, Orientation: ${window.matchMedia("(orientation: landscape)").matches} ${window.orientation}`);
			document.querySelector('div#Container #Background').style.transform = transformScale + transformTranslate;
		};

		if (typeof window !== `undefined`) {
			window.addEventListener('deviceorientation', listener);
		}
	},
	mouseMove: (event) => {
		if (!('ontouchstart' in document.documentElement)) {
			const center = { X: window.innerWidth / 2, Y: window.innerHeight / 2 };
			const MaxDistance = Math.sqrt(center.Y * center.Y + center.X * center.X);
			let distance = Math.sqrt(
				(event.clientX - center.X) * (event.clientX - center.X) +
					(event.clientY - center.Y) * (event.clientY - center.Y)
			);
			let scale = 1 + 0.25 * (Math.floor(distance / MaxDistance * 10) / 10);
			const drag = 0.25;
			const translateX = (event.clientX - center.X) / center.X * drag * 100;
			const translateY = (event.clientY - center.Y) / center.Y * drag * 100;
			const transformScale = ` scale( ${scale}, ${scale}) `;
			const transformTranslate = ` translate( ${translateX}%, ${translateY}%) `;

			// const radian = Math.atan2(event.clientY - center.Y, event.clientX - center.X);
			// const deg = Math.floor((radian * 180 / Math.PI + 180) * 100) / 100;
			// const transformRotate = ` rotate(${deg}deg) `;
			document.querySelector('div#Container #Background').style.transform = transformScale + transformTranslate;
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

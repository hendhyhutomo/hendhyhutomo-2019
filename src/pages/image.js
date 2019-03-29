import React from 'react';
import { Helmet } from 'react-helmet';
import Placeholder from 'images/playground/placeholder1000.jpg';

import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import 'stylesheet/image.scss';

export default class ImagePlayground extends React.Component {
	state = {
		fit: '',
		positionX: '',
		positionY: '',
		bgColor: '',
		bgColorError: false
	};
	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value }, () => {
			IPfn.imagetrigger(this.state);
		});
	};
	handleChangeColor = (event) => {
		const target = 'bgColor';
		this.setState({ [target]: event.target.value }, () => {
			IPfn.imagetrigger(this.state);
		});
		let colorCheck = /^[0-9A-F]{3,6}$/.test(event.target.value);
		const target2 = 'bgColorError';
		if (
			event.target.value.length === 0 ||
			(colorCheck && (event.target.value.length === 3 || event.target.value.length === 6))
		) {
			this.setState({ [target2]: false });
		} else {
			this.setState({ [target2]: true });
		}
	};
	componentDidMount() {
		IPfn.init();
	}
	componentWillUnmount() {
		IPfn.exit();
	}
	render() {
		const webname = 'Image Position Playground';
		return (
			<div id="ImageContainer">
				<Helmet>
					<title>{webname}</title>
					<meta property="og:title" content={webname} />
					<meta property="twitter:title" content={webname} />
				</Helmet>
				<h1>{webname}</h1>
				<p>
					A demo to showcase the different image positioning functionality.<br />{' '}
					<em>*Resize the window to see it in effect</em>
				</p>
				<div id="Options">
					<div>
						<FormControl className="forceAcumin">
							<InputLabel htmlFor="age-simple">Fit</InputLabel>
							<Select
								value={this.state.fit}
								onChange={this.handleChange}
								inputProps={{
									name: 'fit'
								}}
								className="forceAcumin fit select"
							>
								<MenuItem value="">
									<em>Unset</em>
								</MenuItem>
								<MenuItem value="contain">Contain</MenuItem>
								<MenuItem value="cover">Cover</MenuItem>
							</Select>
						</FormControl>
					</div>

					<div>
						<FormControl className="forceAcumin">
							<InputLabel htmlFor="age-simple">X Position</InputLabel>
							<Select
								value={this.state.positionX}
								onChange={this.handleChange}
								inputProps={{
									name: 'positionX'
								}}
								className="forceAcumin position select"
							>
								<MenuItem value="">
									<em>Unset</em>
								</MenuItem>
								<MenuItem value={-1}>Left</MenuItem>
								<MenuItem value={0}>Center</MenuItem>
								<MenuItem value={1}>Right</MenuItem>
							</Select>
							<FormHelperText>Horizontal Position</FormHelperText>
						</FormControl>
					</div>
					<div>
						<FormControl className="forceAcumin">
							<InputLabel htmlFor="age-simple">Y Position</InputLabel>
							<Select
								value={this.state.positionY}
								onChange={this.handleChange}
								inputProps={{
									name: 'positionY'
								}}
								className="forceAcumin position select"
							>
								<MenuItem value="">
									<em>Unset</em>
								</MenuItem>
								<MenuItem value={-1}>Top</MenuItem>
								<MenuItem value={0}>Center</MenuItem>
								<MenuItem value={1}>Bottom</MenuItem>
							</Select>
							<FormHelperText>Vertical Position</FormHelperText>
						</FormControl>
					</div>
					<div>
						<TextField
							error={this.state.bgColorError}
							label="Background Color"
							margin="normal"
							className="colorinput"
							placeholder="FFFFFF"
							helperText="For Contain Fit, RGB Hex Value"
							value={this.state.name}
							onChange={this.handleChangeColor}
						/>
					</div>
				</div>

				<div id="Image" className="">
					<img src={Placeholder} alt="Hendhy Hutomo Placeholder" />
				</div>
			</div>
		);
	}
}

const IPfn = {
	init: () => {
		setTimeout(() => {
			if (typeof document !== `undefined`) {
				document.body.classList.remove('loading');
			}
		}, 500);
		IPfn.imagetrigger('');
	},
	exit: () => {},
	imagetrigger: (data) => {
		const imageDOM = document.querySelector('div#Image > img');
		const colorinput = document.querySelector('.colorinput');
		const { fit, positionX, positionY, bgColor } = data;
		let colorCheck = /[0-9A-F]{3,6}$/i.test(bgColor);

		if (bgColor &&
			(bgColor.length === 0 ||
			(colorCheck && (bgColor.length === 3 || bgColor.length === 6)))
		) {
			imageDOM.style.backgroundColor = '#' + bgColor;
		} else {
			imageDOM.style.backgroundColor = '#fff';
		}

		if (fit === 'contain') {
			imageDOM.style.objectFit = 'contain';
			colorinput.classList.remove('disable');
		} else if (fit === 'cover') {
			imageDOM.style.objectFit = 'cover';
			colorinput.classList.add('disable');
		} else {
			imageDOM.style.objectFit = 'unset';
			colorinput.classList.add('disable');
		}
		let objectPos = '';
		let objectPosX, objectPosY;
		if (positionX === -1) {
			objectPosX = 'left';
		} else if (positionX === 0) {
			objectPosX = 'center';
		} else if (positionX === 1) {
			objectPosX = 'right';
		} else {
			objectPosX = '50%';
		}

		if (positionY === -1) {
			objectPosY = 'top';
		} else if (positionY === 0) {
			objectPosY = 'center';
		} else if (positionY === 1) {
			objectPosY = 'bottom';
		} else {
			objectPosY = '50%';
		}

		if (positionX === '' && positionY === '') {
			objectPos = 'initial';
		} else {
			objectPos = `${objectPosX} ${objectPosY}`;
		}

		imageDOM.style.objectPosition = objectPos;
	}
};

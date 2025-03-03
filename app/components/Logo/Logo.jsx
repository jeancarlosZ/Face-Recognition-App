import Tilt from 'react-parallax-tilt';
import camera from './camera.png';
import './Logo.css';

const Logo = () => {
	return (
		<div className='ma4 mt0'>
			<Tilt className='Tilt br2 shadow-2' style={{ height: 150, width: 150 }}>
				<div className='Tilt-inner pa1'>
					<img style={{ padding: '15px', paddingLeft: '21px' }} alt='logo' src={camera} />
					<p style={{ fontSize: '10px' }}>
						<a target="_blank" href="https://icons8.com/icon/6417/dome-camera">Dome Camera</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
					</p>
				</div>
			</Tilt>
		</div>
	);
}

export default Logo;
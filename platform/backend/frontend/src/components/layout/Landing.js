import React from 'react'
import { Link } from 'react-router-dom'
const Landing = () => {
  return (
		<section className='landing'>
			<div>
				<div className='landing-inner'>
					<h1 className='x-large'>Developer Connector</h1>
					<p className='lead'>
						Create a developer profile/profolio, share posts and get
						help from other Developers
					</p>
					<div className='buttons'>
						<Link to='/register'>Sign Up</Link>
						<Link to='/login'>Login</Link>
					</div>
				</div>
			</div>
		</section>
  );
}

export default Landing

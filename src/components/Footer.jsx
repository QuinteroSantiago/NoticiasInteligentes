import React from 'react';

function Footer() {
	return (
		<div className="py-5 text-center">
			<p className="text-sm mt-3 opacity-80">
				&copy; {new Date().getFullYear()} Gomu Cloud LLC. All rights reserved.
			</p>
		</div>
	)
}

export default Footer;
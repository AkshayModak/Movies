import React from 'react';
import Footer from '../containers/footer';
import Aux from '../HOCs/Aux';

const credits = () => {
		return (
				<Aux>
					<div class="container disclaimer">
            <h1>Credits</h1>

            <h3>Images</h3>
            <p>from TMDB</p>

            <h3>Movies, Television and People Details</h3>
            <p>from TMDB</p>

            <h3>Trailers</h3>
            <p>Embedded from Youtube.com</p>

            <h3>Others</h3>
            <p>All Other Images, fonts and other media are taken from public domain.</p>
          </div>
          <Footer />
        </Aux>
		)
}

export default credits;
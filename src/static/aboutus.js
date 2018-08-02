import React from 'react';
import Footer from '../containers/footer';
import Aux from '../HOCs/Aux';

const about = () => {
		return (
				<Aux>
					<div class="container disclaimer">
            <h1>About Us</h1>
            <p>Hey there,</p>
            <p>My name's Akshay. I'm the one who designed and developed this website. I have started it as a side-project and not running it for any financial profit although I like to experiment with new technologies on it and try to improve it.</p>
            <p>I am a software engineer with 3+ years of experience on Java, XML, FTL, AngularJS, ReactJS and Mysql. Currently Working with a private IT firm in Indore.</p>
            <p>Still, people sometimes write in to ask what software I use, or what hardware I use, and I'm putting that here:</p>
            <ul>
                <li>Designed it on ubuntu on a dell laptop.</li>
                <li>ReactJS, CSS, Bootstrap and HTML are used to develop the front-end.</li>
            </ul>
            <p>Tested this website on Chrome and Mozilla Firefox. If you find any issues you can let me know. I will try to fix it ASAP.</p>
            <p>Since it's just a side-project for me. If you would like to suggest any improvement(s) to existing designs or something or just want to request any new feature. Just let me know. I will try to add that
            feature/improvement in the website. (no guarantees)</p>

            <p>Thanks for visiting this website.</p>
            <p>Keep visiting. :)</p>
          </div>
          <Footer />
        </Aux>
		)
}

export default about;
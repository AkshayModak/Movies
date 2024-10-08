import React from 'react';
import Footer from '../containers/footer';
import Aux from '../HOCs/Aux1';

const disclaimer = () => {
		return (
			<Aux>
				<div className="container disclaimer">
						<h1>Disclaimer</h1>
	          <h3>No warranties</h3>
	          <p>This website is provided “as is” without any representations or warranties, express or implied. nextrr.in makes no representations or warranties in relation to this website or the information and materials provided on this website.</p>

	          <p>Without prejudice to the generality of the foregoing paragraph, nextrr.in does not warrant that:</p>
						<ul>
	          <li>this website will be constantly available, or available at all; or</li>
	          <li>the information on this website is complete, true, accurate or non-misleading.</li>
	          </ul>
	          <p>Nothing on this website constitutes, or is meant to constitute, advice of any kind. [If you require advice in relation to any [legal, financial or medical] matter you should consult an appropriate professional.]</p>

	          <h3>Limitations of liability</h3>

	          <p>nextrr.in will not be liable to you (whether under the law of contract, the law of torts or otherwise) in relation to the contents of, or use of, or otherwise in connection with, this website:</p>
						<ul>
	          <li>[to the extent that the website is provided free-of-charge, for any direct loss;]</li>
	          <li>for any indirect, special or consequential loss; or</li>
	          <li>for any business losses, loss of revenue, income, profits or anticipated savings, loss of contracts or business relationships, loss of reputation or goodwill, or loss or corruption of information or data.</li>
	          </ul>
	          <p>These limitations of liability apply even if nextrr.in has been expressly advised of the potential loss.</p>

	          <h3>Exceptions</h3>
	          <p>Nothing in this website disclaimer will exclude or limit any warranty implied by law that it would be unlawful to exclude or limit; and nothing in this website disclaimer will exclude or limit nextrr.in liability in respect of any:</p>

						<ul>
	          <li>death or personal injury caused by nextrr.in negligence;</li>
	          <li>fraud or fraudulent misrepresentation on the part of nextrr.in; or</li>
	          <li>matter which it would be illegal or unlawful for nextrr.in to exclude or limit, or to attempt or purport to exclude or limit, its liability.</li>
	          </ul>

	          <h3>Reasonableness</h3>
	          <p>By using this website, you agree that the exclusions and limitations of liability set out in this website disclaimer are reasonable.</p>

	          <p>If you do not think they are reasonable, you must not use this website.</p>

	          <h3>Other parties</h3>
	          <p>[You accept that, as a limited liability entity, nextrr.in has an interest in limiting the personal liability of its officers and employees. You agree that you will not bring any claim personally against nextrr.in officers or employees in respect of any losses you suffer in connection with the website.]</p>

	          <p>[Without prejudice to the foregoing paragraph,] you agree that the limitations of warranties and liability set out in this website disclaimer will protect nextrr.in officers, employees, agents, subsidiaries, successors, assigns and sub-contractors as well as nextrr.in.</p>

	          <h3>Unenforceable provisions</h3>
	          <p>If any provision of this website disclaimer is, or is found to be, unenforceable under applicable law, that will not affect the enforceability of the other provisions of this website disclaimer.</p>

				</div>
				<Footer/>
				</Aux>
		);
}

export default disclaimer;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PosterPlaceholder from '../../images/poster-placeholder.png';
import Aux from '../../HOCs/Aux';
import { dateFormatter } from '../../utility/utilityMethods';

class MovieCards extends Component {

		constructor(){
        super();
        this.state = {loaded: false};
      }

		componentDidMount(){
        document.title = "Movie Details";
    }

		render() {
			const poster_path = 'https://image.tmdb.org/t/p/w185' + this.props.data.poster_path;
			let release_date = "";
			if (this.props.isUpcoming) {
					release_date = (
							<small><figcaption className="figure-caption text-center"><strong>Release Date:</strong> {dateFormatter(this.props.data.release_date)}</figcaption></small>
					);
			}
			return (
				<Aux>
					{this.state.loaded ? null :
            <div
              style={{
                backgroundImage: { PosterPlaceholder },
                height: '270px',
                width: '180px',
              }}
            />
          }
					<Link to={{ pathname: '/movie-details', state: { posts: this.props.data, selectedMovie: this.props.selectedMovie} }}>
						<figure className="figure">
              <img style={this.state.loaded ? {} : {display: 'none'}} alt={ this.props.data.title ? this.props.data.title : this.props.data.original_name }
                  src={ this.props.data.poster_path ? poster_path : PosterPlaceholder }
                  onLoad={() => this.setState({loaded: true})}
                  className="figure-img img-fluid rounded" />
              <figcaption className="figure-caption text-center">{ this.props.data.title ? this.props.data.title : this.props.data.original_name}</figcaption>
              {release_date}
            </figure>
          </Link>
        </Aux>
			);
		}
}

export default MovieCards;
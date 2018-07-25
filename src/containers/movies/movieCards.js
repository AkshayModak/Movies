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
			const movie_release_date = this.props.data.release_date;
			const today = new Date().getTime();
			const release_date_time = new Date(movie_release_date).getTime();
			if (release_date_time && (release_date_time > today)) {
					release_date = (
							<small><figcaption className="figure-caption text-center"><strong>Release Date:</strong> {dateFormatter(this.props.data.release_date)}</figcaption></small>
					);
			}
			let linkPath = "/movie-details/" + this.props.data.id;
			if (this.props.data.first_air_date) {
				linkPath = "/tv-details/" + this.props.data.id;
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
					<Link to={linkPath}>
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
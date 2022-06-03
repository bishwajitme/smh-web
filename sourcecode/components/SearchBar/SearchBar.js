import React from 'react';
import LocationSelect from './../LocationSelect/LocationSelect.js';
import EstablishmentSelect from
  './../EstablishmentSelect/EstablishmentSelect.js';
import SearchButton from './../SearchButton/SearchButton.js';
import HeroBlock from '../HeroBlock/HeroBlock.js';
import createMarkup from '../../utils/createMarkup.js';
//import ResetSearchButton from './../ResetSearchButton/ResetSearchButton.js';
import styles from './SearchBar.less';

class SearchBar extends React.Component {

  render () {
//const title = this.props.content.get('hero_title');
//console.log(title);
    return (
      <div id="search_block">
        <h2 id="search_title">HITTA DIN UTBILDNING</h2>
        <section className={styles.base}>
          <EstablishmentSelect />
          <LocationSelect />
          <SearchButton />
        </section>

      </div>
    );

    //<ResetSearchButton filters={this.state.filters}/>
  }
}

SearchBar.propTypes = {
  params: React.PropTypes.object,
};

export default SearchBar;

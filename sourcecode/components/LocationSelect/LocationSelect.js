import React from 'react';
import LocationStore from '../../stores/LocationStore';
import LocationActions from '../../actions/LocationActions';
import SelectDropDown from '../SelectDropDown/SelectDropDown.js';

class LocationSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.getState();
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  componentDidMount () {
    LocationStore.addListener('change', this.onStoreChange);
    LocationActions.fetchIndex();
  }

  componentWillUnmount () {
    LocationStore.removeListener('change', this.onStoreChange);
  }

  onStoreChange () {
    this.setState(this.getState());
  }

  getState () {
    return {
      locations: LocationStore.getAll(),
    };
  }

  render () {
    if (!this.state.locations.size) {
      return false;
    }
    const locations = this.state.locations
      .sortBy(article => article.get('title'));

    return (
      <SelectDropDown
        list={locations}
        type='studieort'
        label='studieort'/>
    );
  }
}

LocationSelect.propTypes = {
  locations: React.PropTypes.object,
};

export default LocationSelect;

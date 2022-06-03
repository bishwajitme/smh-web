import React from 'react';
import EstablishmentStore from '../../stores/EstablishmentStore';
import EstablishmentActions from '../../actions/EstablishmentActions';
import SelectDropDown from '../SelectDropDown/SelectDropDown.js';

class EstablishmentSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.getState();
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  componentDidMount () {
    EstablishmentStore.addListener('change', this.onStoreChange);
    EstablishmentActions.fetchIndex();
  }

  componentWillUnmount () {
    EstablishmentStore.removeListener('change', this.onStoreChange);
  }

  onStoreChange () {
    this.setState(this.getState());
  }

  getState () {
    return {
      establishments: EstablishmentStore.getAll(),
    };
  }

  render () {
    if (!this.state.establishments.size) {
      return false;
    }
    const establishments = this.state.establishments;

    return (
      <SelectDropDown
        list={establishments}
        type='utbildningstyp'
        label='utbildningstyp'/>
    );
  }
}

EstablishmentSelect.propTypes = {};

export default EstablishmentSelect;

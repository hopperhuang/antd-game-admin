import React, { Component } from 'react';
import { Button } from 'antd';
import Table from './Tabel';

class AdvertisementMobile extends Component {
  render() {
    return (<div>
      <Button className="editable-add-btn">Create</Button>
      <Table />
    </div>);
  }
}

export default AdvertisementMobile;
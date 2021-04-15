import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import { connect } from 'react-redux';
import store from '../store';
import { get } from '../fetch';

class PartnerList extends React.Component {
    async componentDidMount() {
        try {
            get('city').then(cities => store.dispatch({ type: 'SET_CITIES', cities }));
            get('company-type').then(companyTypes => store.dispatch({ type: 'SET_COMPANY_TYPES', companyTypes }));
            const list = await get('partner');
            store.dispatch({ type: 'SET_PARTNERS', list });
        } catch (e) {
            alert('Could not fetch list of partners. Please try again!');
        }
    }

    getCity(id) {
        const cities = this.props.cities;
        return cities ? cities.find(i => i.id === id).name : null;
    }

    render() {
        if (!this.props.partners || !this.props.cities || !this.props.companyTypes) {
            return (
                <div style={{ fontSize: '1.3em' }}>
                    <Spinner animation="border" />
                    <span style={{ paddingLeft: '16px' }}>Fetching partner list...</span>
                </div>
            )
        }
        const compTypes = this.props.companyTypes.reduce((ret, curr) => ({ ...ret, [curr.id]: curr.name }), {});
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone number</th>
                        <th>Tax ID</th>
                        <th>Registry ID</th>
                        <th>Bank account</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.partners.map(i =>
                        <tr key={i.id}>
                            <td>{i.name} {compTypes[i.company_type]}</td>
                            <td>{i.address}, {this.getCity(i.city)}</td>
                            <td>{i.phone_number}</td>
                            <td>{i.tax_id}</td>
                            <td>{i.registry_id}</td>
                            <td>{i.bank_account}</td>
                            <td>{i.note}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        )
    }
}

export default connect(state => ({ ...state}))(PartnerList);

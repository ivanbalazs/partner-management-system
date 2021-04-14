import React from 'react';
import { connect } from 'react-redux';
import store from '../store';
import { get } from '../fetch';

class PartnerList extends React.Component {
//    constructor(props) {
//        super(props);
//        this.state = {
//            list: null,
//        }
//    }

    async componentDidMount() {
        try {
            get('city').then(cities => store.dispatch({ type: 'SET_CITIES', cities }));
            get('company-type').then(companyTypes => store.dispatch({ type: 'SET_COMPANY_TYPES', companyTypes }));
            const list = await get('partner');
            store.dispatch({ type: 'SET_PARTNERS', list });
        } catch (e) {
            alert('Could not fetch list of partners. Please try again!');
        }
//        const resp = await fetch(process.env.REACT_APP_SERVER_URL + 'partner');
//        if (resp.ok) {
//            const list = await resp.json();
////            this.setState({ list:  });
//        } else {
//        }
    }

    getCity(id) {
        const cities = this.props.cities;
        return cities ? cities.find(i => i.id === id).name : null;
    }

    render() {
        if (!this.props.partners || !this.props.cities || !this.props.companyTypes) {
            return (
                <h1>Fetching partner list...</h1>
            )
        }
        const compTypes = this.props.companyTypes.reduce((ret, curr) => ({ ...ret, [curr.id]: curr.name }), {});
        return (
            <table>
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
            </table>
        )
    }
}


const mapStateToProps = function(state) {
    return { ...state };
//        partners: state.partners,
//        cities: state.cities,
//        companyTypes: state.companyTypes,
//    };
};

export default connect(mapStateToProps)(PartnerList);

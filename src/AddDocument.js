import React, {Component} from "react";
import RaisedButton from "material-ui/RaisedButton";
import {Card, CardActions, CardText, CardTitle} from "material-ui/Card";
import TextField from "material-ui/TextField";
import {RadioButton, RadioButtonGroup} from "material-ui/RadioButton";
import DatePicker from "material-ui/DatePicker";
import Divider from "material-ui/Divider";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import capitalize from "titleize";
import moment from "moment";

export default class AddDocument extends Component {

    state = {
        sex: "M",
        birthDate: "1970-01-01",
        documentExpirityDate: "2025-01-01",
        documentType: "I",
        hotelGroup: this.props.client.hotelGroup,
        hotel: this.props.client.hotel ? this.props.client.hotel : "",
    };

    isFormValid() {
        return (this.state.firstName)
            && (this.state.lastName)
            && (this.state.documentNumber)
            && (this.state.documentExpirityDate)
            && (this.state.birthDate)
            && (this.state.country)
            && (this.state.sex);
    }

    addDocument() {
        this.props.setWorkInProgress(true);

        fetch("https://" + this.props.appId, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(this.state),
        })
            .then(response => {
                if (response.ok) {
                    this.props.history.push("/");
                } else {
                    console.error(response.statusText);
                    this.props.setAlterError();
                }
            });
    }


    render() {
        return (
            <Card>
                <CardTitle
                    title="Add document information"
                />
                <CardText>
                    <TextField
                        autoFocus
                        name="firstName"
                        floatingLabelText="First name"
                        floatingLabelFixed={true}
                        value={this.state.firstName}
                        onChange={(event) => this.setState({firstName: capitalize(event.target.value)})}
                    />
                    <TextField
                        name="lastName"
                        floatingLabelText="Last name"
                        floatingLabelFixed={true}
                        value={this.state.lastName}
                        onChange={(event) => this.setState({lastName: capitalize(event.target.value)})}
                    />
                    <TextField
                        name="documentNumber"
                        floatingLabelText="Document number"
                        floatingLabelFixed={true}
                        value={this.state.documentNumber}
                        onChange={(event) => this.setState({documentNumber: capitalize(event.target.value)})}
                    />
                    <DatePicker
                        name="birthDate"
                        floatingLabelText="Date of birth"
                        floatingLabelFixed={true}
                        value={new Date(this.state.birthDate)}
                        onChange={(event, value) => this.setState({birthDate: moment(value).format("YYYY-MM-DD")})}
                        maxDate={new Date()}
                    />
                    <DatePicker
                        name="documentExpirityDate"
                        floatingLabelText="Document expiry date"
                        floatingLabelFixed={true}
                        value={new Date(this.state.documentExpirityDate)}
                        onChange={(event, value) => this.setState({documentExpirityDate: moment(value).format("YYYY-MM-DD")})}
                    />
                    <SelectField
                        name="country"
                        floatingLabelText="Country"
                        floatingLabelFixed={true}
                        value={this.state.country}
                        onChange={(event, index, value) => this.setState({country: value})}
                    >
                        <MenuItem value="ISR" primaryText="Israel"/>
                        <MenuItem value="CHL" primaryText="Chile"/>
                        <MenuItem value="PER" primaryText="Peru"/>
                        <MenuItem value="AUS" primaryText="Australia"/>
                        <MenuItem value="GBR" primaryText="United Kingdom"/>
                        <MenuItem value="BRA" primaryText="Brazil"/>
                        <MenuItem value="ARG" primaryText="Argentina"/>
                        <MenuItem value="ECU" primaryText="Ecuador"/>
                        <MenuItem value="USA" primaryText="United States of America"/>
                        <Divider/>
                        <MenuItem value="AFG" primaryText="Afghanistan"/>
                        <MenuItem value="ALA" primaryText="Aland Islands"/>
                        <MenuItem value="ALB" primaryText="Albania"/>
                        <MenuItem value="DZA" primaryText="Algeria"/>
                        <MenuItem value="ASM" primaryText="American Samoa"/>
                        <MenuItem value="AND" primaryText="Andorra"/>
                        <MenuItem value="AGO" primaryText="Angola"/>
                        <MenuItem value="AIA" primaryText="Anguilla"/>
                        <MenuItem value="ATA" primaryText="Antarctica"/>
                        <MenuItem value="ATG" primaryText="Antigua and Barbuda"/>
                        <MenuItem value="ARM" primaryText="Armenia"/>
                        <MenuItem value="ABW" primaryText="Aruba"/>
                        <MenuItem value="AUT" primaryText="Austria"/>
                        <MenuItem value="AZE" primaryText="Azerbaijan"/>
                        <MenuItem value="BHS" primaryText="Bahamas"/>
                        <MenuItem value="BHR" primaryText="Bahrain"/>
                        <MenuItem value="BGD" primaryText="Bangladesh"/>
                        <MenuItem value="BRB" primaryText="Barbados"/>
                        <MenuItem value="BLR" primaryText="Belarus"/>
                        <MenuItem value="BEL" primaryText="Belgium"/>
                        <MenuItem value="BLZ" primaryText="Belize"/>
                        <MenuItem value="BEN" primaryText="Benin"/>
                        <MenuItem value="BMU" primaryText="Bermuda"/>
                        <MenuItem value="BTN" primaryText="Bhutan"/>
                        <MenuItem value="BOL" primaryText="Bolivia"/>
                        <MenuItem value="BIH" primaryText="Bosnia and Herzegovina"/>
                        <MenuItem value="BWA" primaryText="Botswana"/>
                        <MenuItem value="BVT" primaryText="Bouvet Island"/>
                        <MenuItem value="VGB" primaryText="British Virgin Islands"/>
                        <MenuItem value="IOT" primaryText="British Indian Ocean Territory"/>
                        <MenuItem value="BRN" primaryText="Brunei Darussalam"/>
                        <MenuItem value="BGR" primaryText="Bulgaria"/>
                        <MenuItem value="BFA" primaryText="Burkina Faso"/>
                        <MenuItem value="BDI" primaryText="Burundi"/>
                        <MenuItem value="KHM" primaryText="Cambodia"/>
                        <MenuItem value="CMR" primaryText="Cameroon"/>
                        <MenuItem value="CAN" primaryText="Canada"/>
                        <MenuItem value="CPV" primaryText="Cape Verde"/>
                        <MenuItem value="CYM" primaryText="Cayman Islands"/>
                        <MenuItem value="CAF" primaryText="Central African Republic"/>
                        <MenuItem value="TCD" primaryText="Chad"/>
                        <MenuItem value="CHN" primaryText="China"/>
                        <MenuItem value="HKG" primaryText="Hong Kong, SAR China"/>
                        <MenuItem value="MAC" primaryText="Macao, SAR China"/>
                        <MenuItem value="CXR" primaryText="Christmas Island"/>
                        <MenuItem value="CCK" primaryText="Cocos (Keeling) Islands"/>
                        <MenuItem value="COL" primaryText="Colombia"/>
                        <MenuItem value="COM" primaryText="Comoros"/>
                        <MenuItem value="COG" primaryText="Congo (Brazzaville)"/>
                        <MenuItem value="COD" primaryText="Congo, (Kinshasa)"/>
                        <MenuItem value="COK" primaryText="Cook Islands"/>
                        <MenuItem value="CRI" primaryText="Costa Rica"/>
                        <MenuItem value="CIV" primaryText="Côte d'Ivoire"/>
                        <MenuItem value="HRV" primaryText="Croatia"/>
                        <MenuItem value="CUB" primaryText="Cuba"/>
                        <MenuItem value="CYP" primaryText="Cyprus"/>
                        <MenuItem value="CZE" primaryText="Czech Republic"/>
                        <MenuItem value="DNK" primaryText="Denmark"/>
                        <MenuItem value="DJI" primaryText="Djibouti"/>
                        <MenuItem value="DMA" primaryText="Dominica"/>
                        <MenuItem value="DOM" primaryText="Dominican Republic"/>
                        <MenuItem value="EGY" primaryText="Egypt"/>
                        <MenuItem value="SLV" primaryText="El Salvador"/>
                        <MenuItem value="GNQ" primaryText="Equatorial Guinea"/>
                        <MenuItem value="ERI" primaryText="Eritrea"/>
                        <MenuItem value="EST" primaryText="Estonia"/>
                        <MenuItem value="ETH" primaryText="Ethiopia"/>
                        <MenuItem value="FLK" primaryText="Falkland Islands (Malvinas)"/>
                        <MenuItem value="FRO" primaryText="Faroe Islands"/>
                        <MenuItem value="FJI" primaryText="Fiji"/>
                        <MenuItem value="FIN" primaryText="Finland"/>
                        <MenuItem value="FRA" primaryText="France"/>
                        <MenuItem value="GUF" primaryText="French Guiana"/>
                        <MenuItem value="PYF" primaryText="French Polynesia"/>
                        <MenuItem value="ATF" primaryText="French Southern Territories"/>
                        <MenuItem value="GAB" primaryText="Gabon"/>
                        <MenuItem value="GMB" primaryText="Gambia"/>
                        <MenuItem value="GEO" primaryText="Georgia"/>
                        <MenuItem value="DEU" primaryText="Germany"/>
                        <MenuItem value="GHA" primaryText="Ghana"/>
                        <MenuItem value="GIB" primaryText="Gibraltar"/>
                        <MenuItem value="GRC" primaryText="Greece"/>
                        <MenuItem value="GRL" primaryText="Greenland"/>
                        <MenuItem value="GRD" primaryText="Grenada"/>
                        <MenuItem value="GLP" primaryText="Guadeloupe"/>
                        <MenuItem value="GUM" primaryText="Guam"/>
                        <MenuItem value="GTM" primaryText="Guatemala"/>
                        <MenuItem value="GGY" primaryText="Guernsey"/>
                        <MenuItem value="GIN" primaryText="Guinea"/>
                        <MenuItem value="GNB" primaryText="Guinea-Bissau"/>
                        <MenuItem value="GUY" primaryText="Guyana"/>
                        <MenuItem value="HTI" primaryText="Haiti"/>
                        <MenuItem value="HMD" primaryText="Heard and Mcdonald Islands"/>
                        <MenuItem value="VAT" primaryText="Holy See (Vatican City State)"/>
                        <MenuItem value="HND" primaryText="Honduras"/>
                        <MenuItem value="HUN" primaryText="Hungary"/>
                        <MenuItem value="ISL" primaryText="Iceland"/>
                        <MenuItem value="IND" primaryText="India"/>
                        <MenuItem value="IDN" primaryText="Indonesia"/>
                        <MenuItem value="IRN" primaryText="Iran, Islamic Republic of"/>
                        <MenuItem value="IRQ" primaryText="Iraq"/>
                        <MenuItem value="IRL" primaryText="Ireland"/>
                        <MenuItem value="IMN" primaryText="Isle of Man"/>
                        <MenuItem value="ITA" primaryText="Italy"/>
                        <MenuItem value="JAM" primaryText="Jamaica"/>
                        <MenuItem value="JPN" primaryText="Japan"/>
                        <MenuItem value="JEY" primaryText="Jersey"/>
                        <MenuItem value="JOR" primaryText="Jordan"/>
                        <MenuItem value="KAZ" primaryText="Kazakhstan"/>
                        <MenuItem value="KEN" primaryText="Kenya"/>
                        <MenuItem value="KIR" primaryText="Kiribati"/>
                        <MenuItem value="PRK" primaryText="Korea (North)"/>
                        <MenuItem value="KOR" primaryText="Korea (South)"/>
                        <MenuItem value="KWT" primaryText="Kuwait"/>
                        <MenuItem value="KGZ" primaryText="Kyrgyzstan"/>
                        <MenuItem value="LAO" primaryText="Lao PDR"/>
                        <MenuItem value="LVA" primaryText="Latvia"/>
                        <MenuItem value="LBN" primaryText="Lebanon"/>
                        <MenuItem value="LSO" primaryText="Lesotho"/>
                        <MenuItem value="LBR" primaryText="Liberia"/>
                        <MenuItem value="LBY" primaryText="Libya"/>
                        <MenuItem value="LIE" primaryText="Liechtenstein"/>
                        <MenuItem value="LTU" primaryText="Lithuania"/>
                        <MenuItem value="LUX" primaryText="Luxembourg"/>
                        <MenuItem value="MKD" primaryText="Macedonia, Republic of"/>
                        <MenuItem value="MDG" primaryText="Madagascar"/>
                        <MenuItem value="MWI" primaryText="Malawi"/>
                        <MenuItem value="MYS" primaryText="Malaysia"/>
                        <MenuItem value="MDV" primaryText="Maldives"/>
                        <MenuItem value="MLI" primaryText="Mali"/>
                        <MenuItem value="MLT" primaryText="Malta"/>
                        <MenuItem value="MHL" primaryText="Marshall Islands"/>
                        <MenuItem value="MTQ" primaryText="Martinique"/>
                        <MenuItem value="MRT" primaryText="Mauritania"/>
                        <MenuItem value="MUS" primaryText="Mauritius"/>
                        <MenuItem value="MYT" primaryText="Mayotte"/>
                        <MenuItem value="MEX" primaryText="Mexico"/>
                        <MenuItem value="FSM" primaryText="Micronesia, Federated States of"/>
                        <MenuItem value="MDA" primaryText="Moldova"/>
                        <MenuItem value="MCO" primaryText="Monaco"/>
                        <MenuItem value="MNG" primaryText="Mongolia"/>
                        <MenuItem value="MNE" primaryText="Montenegro"/>
                        <MenuItem value="MSR" primaryText="Montserrat"/>
                        <MenuItem value="MAR" primaryText="Morocco"/>
                        <MenuItem value="MOZ" primaryText="Mozambique"/>
                        <MenuItem value="MMR" primaryText="Myanmar"/>
                        <MenuItem value="NAM" primaryText="Namibia"/>
                        <MenuItem value="NRU" primaryText="Nauru"/>
                        <MenuItem value="NPL" primaryText="Nepal"/>
                        <MenuItem value="NLD" primaryText="Netherlands"/>
                        <MenuItem value="ANT" primaryText="Netherlands Antilles"/>
                        <MenuItem value="NCL" primaryText="New Caledonia"/>
                        <MenuItem value="NZL" primaryText="New Zealand"/>
                        <MenuItem value="NIC" primaryText="Nicaragua"/>
                        <MenuItem value="NER" primaryText="Niger"/>
                        <MenuItem value="NGA" primaryText="Nigeria"/>
                        <MenuItem value="NIU" primaryText="Niue"/>
                        <MenuItem value="NFK" primaryText="Norfolk Island"/>
                        <MenuItem value="MNP" primaryText="Northern Mariana Islands"/>
                        <MenuItem value="NOR" primaryText="Norway"/>
                        <MenuItem value="OMN" primaryText="Oman"/>
                        <MenuItem value="PAK" primaryText="Pakistan"/>
                        <MenuItem value="PLW" primaryText="Palau"/>
                        <MenuItem value="PSE" primaryText="Palestinian Territory"/>
                        <MenuItem value="PAN" primaryText="Panama"/>
                        <MenuItem value="PNG" primaryText="Papua New Guinea"/>
                        <MenuItem value="PRY" primaryText="Paraguay"/>
                        <MenuItem value="PHL" primaryText="Philippines"/>
                        <MenuItem value="PCN" primaryText="Pitcairn"/>
                        <MenuItem value="POL" primaryText="Poland"/>
                        <MenuItem value="PRT" primaryText="Portugal"/>
                        <MenuItem value="PRI" primaryText="Puerto Rico"/>
                        <MenuItem value="QAT" primaryText="Qatar"/>
                        <MenuItem value="REU" primaryText="Réunion"/>
                        <MenuItem value="ROU" primaryText="Romania"/>
                        <MenuItem value="RUS" primaryText="Russian Federation"/>
                        <MenuItem value="RWA" primaryText="Rwanda"/>
                        <MenuItem value="BLM" primaryText="Saint-Barthélemy"/>
                        <MenuItem value="SHN" primaryText="Saint Helena"/>
                        <MenuItem value="KNA" primaryText="Saint Kitts and Nevis"/>
                        <MenuItem value="LCA" primaryText="Saint Lucia"/>
                        <MenuItem value="MAF" primaryText="Saint-Martin (French part)"/>
                        <MenuItem value="SPM" primaryText="Saint Pierre and Miquelon"/>
                        <MenuItem value="VCT" primaryText="Saint Vincent and Grenadines"/>
                        <MenuItem value="WSM" primaryText="Samoa"/>
                        <MenuItem value="SMR" primaryText="San Marino"/>
                        <MenuItem value="STP" primaryText="Sao Tome and Principe"/>
                        <MenuItem value="SAU" primaryText="Saudi Arabia"/>
                        <MenuItem value="SEN" primaryText="Senegal"/>
                        <MenuItem value="SRB" primaryText="Serbia"/>
                        <MenuItem value="SYC" primaryText="Seychelles"/>
                        <MenuItem value="SLE" primaryText="Sierra Leone"/>
                        <MenuItem value="SGP" primaryText="Singapore"/>
                        <MenuItem value="SVK" primaryText="Slovakia"/>
                        <MenuItem value="SVN" primaryText="Slovenia"/>
                        <MenuItem value="SLB" primaryText="Solomon Islands"/>
                        <MenuItem value="SOM" primaryText="Somalia"/>
                        <MenuItem value="ZAF" primaryText="South Africa"/>
                        <MenuItem value="SGS" primaryText="South Georgia and the South Sandwich Islands"/>
                        <MenuItem value="SSD" primaryText="South Sudan"/>
                        <MenuItem value="ESP" primaryText="Spain"/>
                        <MenuItem value="LKA" primaryText="Sri Lanka"/>
                        <MenuItem value="SDN" primaryText="Sudan"/>
                        <MenuItem value="SUR" primaryText="Suriname"/>
                        <MenuItem value="SJM" primaryText="Svalbard and Jan Mayen Islands"/>
                        <MenuItem value="SWZ" primaryText="Swaziland"/>
                        <MenuItem value="SWE" primaryText="Sweden"/>
                        <MenuItem value="CHE" primaryText="Switzerland"/>
                        <MenuItem value="SYR" primaryText="Syrian Arab Republic (Syria)"/>
                        <MenuItem value="TWN" primaryText="Taiwan, Republic of China"/>
                        <MenuItem value="TJK" primaryText="Tajikistan"/>
                        <MenuItem value="TZA" primaryText="Tanzania, United Republic of"/>
                        <MenuItem value="THA" primaryText="Thailand"/>
                        <MenuItem value="TLS" primaryText="Timor-Leste"/>
                        <MenuItem value="TGO" primaryText="Togo"/>
                        <MenuItem value="TKL" primaryText="Tokelau"/>
                        <MenuItem value="TON" primaryText="Tonga"/>
                        <MenuItem value="TTO" primaryText="Trinidad and Tobago"/>
                        <MenuItem value="TUN" primaryText="Tunisia"/>
                        <MenuItem value="TUR" primaryText="Turkey"/>
                        <MenuItem value="TKM" primaryText="Turkmenistan"/>
                        <MenuItem value="TCA" primaryText="Turks and Caicos Islands"/>
                        <MenuItem value="TUV" primaryText="Tuvalu"/>
                        <MenuItem value="UGA" primaryText="Uganda"/>
                        <MenuItem value="UKR" primaryText="Ukraine"/>
                        <MenuItem value="ARE" primaryText="United Arab Emirates"/>
                        <MenuItem value="UMI" primaryText="US Minor Outlying Islands"/>
                        <MenuItem value="URY" primaryText="Uruguay"/>
                        <MenuItem value="UZB" primaryText="Uzbekistan"/>
                        <MenuItem value="VUT" primaryText="Vanuatu"/>
                        <MenuItem value="VEN" primaryText="Venezuela (Bolivarian Republic)"/>
                        <MenuItem value="VNM" primaryText="Viet Nam"/>
                        <MenuItem value="VIR" primaryText="Virgin Islands, US"/>
                        <MenuItem value="WLF" primaryText="Wallis and Futuna Islands"/>
                        <MenuItem value="ESH" primaryText="Western Sahara"/>
                        <MenuItem value="YEM" primaryText="Yemen"/>
                        <MenuItem value="ZMB" primaryText="Zambia"/>
                        <MenuItem value="ZWE" primaryText="Zimbabwe"/>
                    </SelectField>
                    <RadioButtonGroup
                        name="sex"
                        valueSelected={this.state.sex}
                        defaultSelected={this.state.sex}
                        onChange={(event, value) => this.setState({value})}
                    >
                        <RadioButton
                            key="M"
                            value="M"
                            label="Male"
                        />
                        <RadioButton
                            key="F"
                            value="F"
                            label="Female"
                        />
                    </RadioButtonGroup>
                </CardText>
                <CardActions>
                    <RaisedButton
                        label="Add Document"
                        disabled={!this.isFormValid()}
                        primary={true}
                        onTouchTap={(e) => {
                            e.preventDefault();
                            this.addDocument();
                        }}
                    />
                </CardActions>
            </Card>
        );
    }
}
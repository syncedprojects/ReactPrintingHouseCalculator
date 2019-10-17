import React from 'react';
import ReactDOM from 'react-dom';
import numeral from 'numeral';

class Calculator extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {
            kolichestvo_ekzemplyarov: '1000',
            format_gotovoy_produkcii: 'A2',
            plastiny: 'ispolnitelya',
            krasochnost: '4',
            lakirovka: 'net',
            vysechka: 'net',
            tisneniye: 'net',
            kongrev: 'net',
            perforatsiya: 'net',
            bigovka: 'net',
            numeratsiya: 'net',
            dvustoronnyaya_pechat: 'net',
            sverhsrochnaya_pechat: '3',
            stoimost_zakaza: 0,
        };

        this.cena_za_list = {
            'A2': {
                'ispolnitelya': {
                    "500": 1289,
                    "1000": 675,
                    "2000": 390,
                    "2500": 330,
                    "3000": 290,
                    "4000": 247,
                    "5000": 212,
                    "6000": 193,
                    "7000": 182,
                    "8000": 175,
                    "9000": 170,
                    "10000": 160,
                    "15000": 150,
                    "20000": 146,
                },
                'zakazchika': {
                    "500": 1011,
                    "1000": 545,
                    "2000": 325,
                    "2500": 278,
                    "3000": 246,
                    "4000": 214,
                    "5000": 192,
                    "6000": 180,
                    "7000": 162,
                    "8000": 155,
                    "9000": 147,
                    "10000": 140,
                    "15000": 133,
                    "20000": 126,
                },
            },
            'A1': {
                'ispolnitelya': {
                    "500": 1675,
                    "1000": 860,
                    "1500": 650,
                    "2000": 508,
                    "2500": 430,
                    "3000": 385,
                    "4000": 330,
                    "5000": 305,
                    "6000": 278,
                    "7000": 262,
                    "8000": 252,
                    "9000": 240,
                    "10000": 235,
                    "12000": 225,
                    "15000": 215,
                    "20000": 198,
                },
                'zakazchika': {
                    "500": 1182,
                    "1000": 578,
                    "1500": 480,
                    "2000": 395,
                    "2500": 330,
                    "3000": 310,
                    "4000": 267,
                    "5000": 240,
                    "6000": 235,
                    "7000": 220,
                    "8000": 215,
                    "9000": 210,
                    "10000": 205,
                    "12000": 198,
                    "15000": 192,
                    "20000": 187,
                },
            },
        };

        this.protsent_krasochnosti = {
            '7': 1.9,
            '6': 1.6,
            '5': 1.3,
            '4': 1,
            '3': 0.85,
            '2': 0.65,
            '1': 0.35,
        };

        this.cena_lakirovki = {
            'net': 0,
            'ofsetnym_lakom': 200,
            'vodyanym_lakom': 160,
        };

        this.cena_vysechki = {
            'A1': 165,
            'A2': 75,
        };

        this.cena_tisneniya = 50;

        this.cena_kongreva = 50;

        this.cena_perforatsii = 35;

        this.cena_bigovki = 25;

        this.cena_numeratsii = 50;

        this.protsent_dvustoronnoy_pechati = {
            'net': 1,
            'so_svoim_oborotom': 1.5,
            '7': 1.9,
            '6': 1.6,
            '5': 1.3,
            '4': 1,
            '3': 0.85,
            '2': 0.65,
            '1': 0.35,
        };

        this.protsent_sverhsrochnoy_pechati = {
            '3': 1,
            '2': 1.15,
            '1': 1.3,
        };
    }

    componentDidMount() {
        let thisState = Object.assign( {}, this.state );

        thisState.stoimost_zakaza = this.calculateCost();

        this.setState( thisState );
    }

    onFieldChange( evt ) {
        let thisState = Object.assign( {}, this.state );
        
        const prezhniy_format_gotovoy_produkcii = thisState.format_gotovoy_produkcii;

        thisState[ evt.target.name ] = evt.target.value;

        if ( prezhniy_format_gotovoy_produkcii == 'A1' && thisState.format_gotovoy_produkcii == 'A2' ) {
            thisState.kolichestvo_ekzemplyarov = '500';
            thisState.lakirovka = 'net';
        }

        this.setState( thisState );
    }

    onFormSubmit( evt ) {
        evt.preventDefault();

        const stoimost_zakaza = this.calculateCost();

        this.setState( {
            stoimost_zakaza: stoimost_zakaza,
        } );
    }

    calculateCost() {
        let cena_za_list = this.cena_za_list[ this.state.format_gotovoy_produkcii ][ this.state.plastiny ][ this.state.kolichestvo_ekzemplyarov ];
        if ( [ '7', '6', '5', '4', '3', '2', '1' ].indexOf( this.state.dvustoronnyaya_pechat ) > -1 ) {
            cena_za_list += cena_za_list * this.protsent_dvustoronnoy_pechati[ this.state.dvustoronnyaya_pechat ];
        }
        if ( this.state.format_gotovoy_produkcii == 'A1' ) {
            cena_za_list += this.cena_lakirovki[ this.state.lakirovka ];
        }
        if ( this.state.vysechka == 'da' ) {
            cena_za_list += this.cena_vysechki[ this.state.format_gotovoy_produkcii ];
        }
        if ( this.state.tisneniye == 'da' ) {
            cena_za_list += this.cena_tisneniya;
        }
        if ( this.state.kongrev == 'da' ) {
            cena_za_list += this.cena_kongreva;
        }
        if ( this.state.perforatsiya == 'da' ) {
            cena_za_list += this.cena_perforatsii;
        }
        if ( this.state.bigovka == 'da' ) {
            cena_za_list += this.cena_bigovki;
        }
        if ( this.state.numeratsiya == 'da' ) {
            cena_za_list += this.cena_numeratsii;
        }

        let stoimost_zakaza =
            cena_za_list
            *
            parseInt( this.state.kolichestvo_ekzemplyarov )
            *
            this.protsent_krasochnosti[ this.state.krasochnost ]
            *
            this.protsent_sverhsrochnoy_pechati[ this.state.sverhsrochnaya_pechat ];

        if ( this.state.dvustoronnyaya_pechat == 'net' || this.state.dvustoronnyaya_pechat == 'so_svoim_oborotom' ) {
            stoimost_zakaza *= this.protsent_dvustoronnoy_pechati[ this.state.dvustoronnyaya_pechat ];
        }

        return stoimost_zakaza;
    }

    render() {
        return (
            <div>
                <h4>Калькулятор стоимости печати для типографий</h4>
                <form className="calculator_form" action="#" method="get" onSubmit={ ( evt ) => this.onFormSubmit( evt ) }>
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="box-wrap">
                                <div className="box">
                                    <label>Количество экземпляров</label>
                                    <select className="form-control" name="kolichestvo_ekzemplyarov" value={ this.state.kolichestvo_ekzemplyarov } onChange={ ( evt ) => this.onFieldChange( evt ) }>
                                        <option value="500">500</option>
                                        <option value="1000">1 000</option>
                                        {
                                            ( this.state.format_gotovoy_produkcii == 'A1' ) ?
                                                <option value="1500">1 500</option>
                                                :
                                                null
                                        }
                                        <option value="2000">2 000</option>
                                        <option value="2500">2 500</option>
                                        <option value="3000">3 000</option>
                                        <option value="4000">4 000</option>
                                        <option value="5000">5 000</option>
                                        <option value="6000">6 000</option>
                                        <option value="7000">7 000</option>
                                        <option value="8000">8 000</option>
                                        <option value="9000">9 000</option>
                                        <option value="10000">10 000</option>
                                        {
                                            ( this.state.format_gotovoy_produkcii == 'A1' ) ?
                                                <option value="12000">12 000</option>
                                                :
                                                null
                                        }
                                        <option value="15000">15 000</option>
                                        <option value="20000">20 000 и более</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="box-wrap">
                                <div className="box">
                                    <label>Формат готовой продукции</label>
                                    <select className="form-control" name="format_gotovoy_produkcii" value={ this.state.format_gotovoy_produkcii } onChange={ ( evt ) => this.onFieldChange( evt ) }>
                                        <option value="A1">А1</option>
                                        <option value="A2">А2</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="box-wrap">
                                <div className="box">
                                    <label>Пластины</label>
                                    <select className="form-control" name="plastiny" value={ this.state.plastiny } onChange={ ( evt ) => this.onFieldChange( evt ) }>
                                        <option value="ispolnitelya">Исполнителя</option>
                                        <option value="zakazchika">Заказчика</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="box-wrap">
                                <div className="box">
                                    <label>Красочность</label>
                                    <select className="form-control" name="krasochnost" value={ this.state.krasochnost } onChange={ ( evt ) => this.onFieldChange( evt ) }>
                                        <option value="7">7 (семь красок)</option>
                                        <option value="6">6 (шесть красок)</option>
                                        <option value="5">5 (пять красок)</option>
                                        <option value="4">4 (полноцветная печать, четыре красок)</option>
                                        <option value="3">3 (три краски)</option>
                                        <option value="2">2 (две краски)</option>
                                        <option value="1">1 (одна краска)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="box-wrap">
                                <div className="box">
                                    <label>Двусторонняя печать</label>
                                    <select className="form-control" name="dvustoronnyaya_pechat" value={ this.state.dvustoronnyaya_pechat } onChange={ ( evt ) => this.onFieldChange( evt ) }>
                                        <option value="net">Нет</option>
                                        <option value="so_svoim_oborotom">Со своим оборотом (+50% наценки к стоимости заказа)</option>
                                        <option value="7">7 (семь красок)</option>
                                        <option value="6">6 (шесть красок)</option>
                                        <option value="5">5 (пять красок)</option>
                                        <option value="4">4 (полноцветная печать, четыре красок)</option>
                                        <option value="3">3 (три краски)</option>
                                        <option value="2">2 (две краски)</option>
                                        <option value="1">1 (одна краска)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="box-wrap">
                                <div className="box">
                                    <label>Лакировка</label>
                                    <select className="form-control" name="lakirovka" value={ this.state.lakirovka } onChange={ ( evt ) => this.onFieldChange( evt ) }>
                                        <option value="net">Нет</option>
                                        {
                                            ( this.state.format_gotovoy_produkcii == 'A1' ) ?
                                                <React.Fragment>
                                                    <option value="ofsetnym_lakom">Офсетным лаком</option>
                                                    <option value="vodyanym_lakom">Водяним лаком</option>
                                                </React.Fragment>
                                                :
                                                null
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="box-wrap">
                                <div className="box">
                                    <label>Высечка</label>
                                    <select className="form-control" name="vysechka" value={ this.state.vysechka } onChange={ ( evt ) => this.onFieldChange( evt ) }>
                                        <option value="net">Нет</option>
                                        <option value="da">Да</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="box-wrap">
                                <div className="box">
                                    <label>Тиснение</label>
                                    <select className="form-control" name="tisneniye" value={ this.state.tisneniye } onChange={ ( evt ) => this.onFieldChange( evt ) }>
                                        <option value="net">Нет</option>
                                        <option value="da">Да</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="box-wrap">
                                <div className="box">
                                    <label>Конгрев</label>
                                    <select className="form-control" name="kongrev" value={ this.state.kongrev } onChange={ ( evt ) => this.onFieldChange( evt ) }>
                                        <option value="net">Нет</option>
                                        <option value="da">Да</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="box-wrap">
                                <div className="box">
                                    <label>Перфорация</label>
                                    <select className="form-control" name="perforatsiya" value={ this.state.perforatsiya } onChange={ ( evt ) => this.onFieldChange( evt ) }>
                                        <option value="net">Нет</option>
                                        <option value="da">Да</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="box-wrap">
                                <div className="box">
                                    <label>Биговка</label>
                                    <select className="form-control" name="bigovka" value={ this.state.bigovka } onChange={ ( evt ) => this.onFieldChange( evt ) }>
                                        <option value="net">Нет</option>
                                        <option value="da">Да</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="box-wrap">
                                <div className="box">
                                    <label>Нумерация</label>
                                    <select className="form-control" name="numeratsiya" value={ this.state.numeratsiya } onChange={ ( evt ) => this.onFieldChange( evt ) }>
                                        <option value="net">Нет</option>
                                        <option value="da">Да</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="box-wrap">
                                <div className="box">
                                    <label>Сверхсрочная печать</label>
                                    <select className="form-control" name="sverhsrochnaya_pechat" value={ this.state.sverhsrochnaya_pechat } onChange={ ( evt ) => this.onFieldChange( evt ) }>
                                        <option value="3">3 дня (стандарт)</option>
                                        <option value="2">2 дня (+15% наценки к стоимости заказа)</option>
                                        <option value="1">1 день (+30% наценки к стоимости заказа)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div>
                                <div>
                                    <label>Бумага с тех отх.:</label>
                                    <p>
                                        {
                                            ( this.state.kolichestvo_ekzemplyarov <= 5000 ) ?
                                                200
                                                :
                                            ( this.state.kolichestvo_ekzemplyarov >= 6000 && this.state.kolichestvo_ekzemplyarov <= 9000 ) ?
                                                300
                                                :
                                                400
                                        } л-в
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <hr/>
                            <div className="bottom">
                                <div className="price_wrap">
                                    <span className="txt_price">Стоимость:</span>
                                    <span className="price"><span id="total_cost">{ numeral( this.state.stoimost_zakaza ).format( '0,0' ).replace( /,/g, ' ' ) } ({ numeral( this.state.stoimost_zakaza * 1.2 ).format( '0,0' ).replace( /,/g, ' ' ) } с НДС)</span> сум.</span>
                                </div>
                                <button className="btn gr_btn_wrap">
                                    <span className="gr_btn">Расчитать&nbsp;<i className="fa fa-long-arrow-right"></i></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
};
 
ReactDOM.render( <Calculator />, document.getElementById( 'root' ) );
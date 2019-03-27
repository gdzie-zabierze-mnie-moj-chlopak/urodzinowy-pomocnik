import React, { Component } from 'react';
import { Button, Card, Jumbotron } from 'react-bootstrap';
import './App.css';

const PAGES = {
  INTRO: 1,
  SCENARIO: 2,
  OPTION: 3,
  SUMMARY: 4,
}

const SCENARIOS = {
  CULTURE: {
    title: 'Kultura',
    subtitle: 'Pora się nieco odchamić!',
    desc: 'Jesteśmy już dorośli, trzeba skończyć z wygłupami. Pora zaznać trochę rozrywek poważnych i kulturalnych ludzi - w końcu do bycia takimi aspirujemy.',
  },
  FRIENDS: {
    title: 'Znajomi',
    subtitle: 'Chcę świętować w większym gronie!',
    desc: 'Podzwońmy po ludziach - na pewno ktoś się nudzi. Możemy się spotkać i porobić coś fajnego. Ale nawet jeśli nikt nie ma dziś czasu to nic - możemy to zrobić tylko we dwoje.',
  },
  SPORT: {
    title: 'Sport',
    subtitle: 'Zmęczmy się i zjedzmy coś!',
    desc: 'Dość tego sztywniactwa - przebierzmy się w luźne ciuchy i wypoćmy trochę kalorii. Później trzeba będzie tylko uzupełnić trochę energii czymś pożywnym :)',
  },
}

const OPTIONS = {
  CULTURE: {
    ACT: {
      title: 'Teatr',
      subtitle: 'Teatr Polski',
      desc: 'O 19:00 grany jest komedia romantyczna "Filadelfiska opowieść". W oczekiwaniu na nią możemy się udać na jakąś kolację/deser.',
    },
    MOVIE: {
      title: 'Kino',
      subtitle: 'Dowolne kino',
      desc: 'Przejrzyjmy repertuar kin i wybierzmy najbardziej interesujący film. Decydujący głos posiada Karolinka :)',
    },
  },
  FRIENDS: {
    SNOOKER: {
      title: 'Bilard',
      subtitle: 'Fuga Mundi/La Sezam',
      desc: 'Można też pomyśleć o innej grze barowej. Choć w bilard gra się w 2 osoby, zawsze fajniej wynająć 2-3 stoły w większej grupie.',
    },
    PUBQUIZ: {
      title: 'Pub Quiz',
      subtitle: 'Lewitacja/Pizza Hut',
      desc: 'Możliwe terminy to 19:30 (Lewitacja) lub 20:00 (Pizza Hut na Skłodowskiej). W oczekiwaniu na pozostałych można coś zakąsić.',
    },
  },
  SPORT: {
    TRAMPOLINE: {
      title: 'Park Trampolin',
      subtitle: 'GOjump',
      desc: 'Brzmi jak atrakcja dla dzieci, ale to tylko pozory. podobno wizyta tam potrafi nieźle dać w kość.',
    },
    CLIMBING: {
      title: 'Ścianka wspinaczkowa',
      subtitle: 'Fpinka',
      desc: 'Podążajmy za aktualnymi trendami i także zacznijmy przygodę ze ścianką wspinaczkową :)',
    },
  },
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      page: PAGES.INTRO,
      showScenarios: false,
      showOptions: false,
      scenario: null,
    };
  }

  renderCard = (options, handleOnClick, height) => {
    const {title, subtitle, desc} = options;
    return (
      <div key={title} style={{height: `${height}%`, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <Card key={title} style={{ width: '100%', backgroundColor: '#cecece' }} onClick={handleOnClick}>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
            <Card.Text>{desc}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }

  renderOptionChoice = () => {
    const handleOnChooseClick = () => this.setState({showOptions: true});
    const handleOnDrawClick = () => {
      const optionKeys = Object.keys(OPTIONS[this.state.scenario]);
      this.setState({
        option: optionKeys[Math.floor(Math.random()*optionKeys.length)],
        page: PAGES.SUMMARY,
      })
    };
    const handleOnOptionClick = (option) => () => this.setState({option, page: PAGES.SUMMARY});
    const renderOptionCards = () => {
      const cardPercentageHeight = Math.floor(100 / Object.keys(OPTIONS[this.state.scenario]).length);
      return (
        <div style={{flexGrow: 1}}>
          {
            Object.keys(OPTIONS[this.state.scenario])
              .map(option => this.renderCard(OPTIONS[this.state.scenario][option], handleOnOptionClick(option), cardPercentageHeight))
          }
        </div>
      );
    };
    const renderButtons = () => {
      return (
        <p>
          <Button variant="primary" onClick={handleOnChooseClick}>Wybierz</Button>
          &nbsp;&nbsp;&nbsp;
          <Button variant="secondary" onClick={handleOnDrawClick}>Losuj</Button>
        </p>
      )
    };
    const renderBody = () => {
      return this.state.showOptions ? renderOptionCards() : renderButtons();
    }

    return (
      <Jumbotron style={{height: "100vh", marginBottom: 0, display: 'flex', flexFlow: 'column'}}> 
        <h2>Wybór opcji</h2><br />
        <h5>Wybrany scenariusz: {SCENARIOS[this.state.scenario].title}</h5>
        <h6>{SCENARIOS[this.state.scenario].desc}</h6><br />
        <p>Skoro wybór scenariusza mamy już za sobą to pora na konkret. Podobnie jak wcześniej możesz sama zadecydować o swojej najbliższej przyszłości lub zaufać ślepemu losowi :)</p>
        {renderBody()}
      </Jumbotron>
    );
  }

  renderScenarioChoice = () => {
    const handleOnChooseClick = () => this.setState({showScenarios: true});
    const handleOnDrawClick = () => {
      const scenarioKeys = Object.keys(SCENARIOS);
      this.setState({
        scenario: scenarioKeys[Math.floor(Math.random()*scenarioKeys.length)],
        page: PAGES.OPTION,
      })
    };
    const handleOnScenarioClick = (scenario) => () => this.setState({scenario, page: PAGES.OPTION});
    const renderScenarioCards = () => {
      const cardPercentageHeight = Math.floor(100 / Object.keys(SCENARIOS).length);
      return (
        <div style={{flexGrow: 1}}>
          {Object.keys(SCENARIOS).map(scenario => this.renderCard(SCENARIOS[scenario], handleOnScenarioClick(scenario), cardPercentageHeight))}
        </div>
      );
    };
    const renderButtons = () => {
      return (
        <p>
          <Button variant="primary" onClick={handleOnChooseClick}>Wybierz</Button>
          &nbsp;&nbsp;&nbsp;
          <Button variant="secondary" onClick={handleOnDrawClick}>Losuj</Button>
        </p>
      )
    };
    const renderBody = () => {
      return this.state.showScenarios ? renderScenarioCards() : renderButtons();
    }

    return (
      <Jumbotron style={{height: "100vh", marginBottom: 0, display: 'flex', flexFlow: 'column'}}> 
        <h2>Wybór scenariusza</h2>
        <p>
          W pierwszym kroku wypada zdefiniować zgrubny pomysł na spędzenie wieczoru.
          Możesz sama wybrać jeden spośród 3 scenariuszy lub zrzucić problem decyzyjny na aplikację klikając przycisk <i>Losuj</i> (<b>Uwaga</b>: używasz na własną odpowiedzialność!).
        </p>
        {renderBody()}
      </Jumbotron>
    );
  }

  renderSummary = () => {
    return (
      <Jumbotron style={{height: "100vh", marginBottom: 0, display: 'flex', flexFlow: 'column'}}>
        <h2>Sukces!</h2>
        <p>
          Najtrudniejszą część mamy już za sobą. Nie było łatwo, ale udało się ustalić co będziemy robić w Twoje urodziny! Bartuś jest z Ciebie dumny :)
        </p>
        <div style={{flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <Card bg="primary" text="white">
            <Card.Header as="h3">Twój wybór:</Card.Header>
            <Card.Body>
              <Card.Title>{OPTIONS[this.state.scenario][this.state.option].title}</Card.Title>
              <Card.Subtitle className="mb-2 text-white">{OPTIONS[this.state.scenario][this.state.option].subtitle}</Card.Subtitle>
              <Card.Text>
              {OPTIONS[this.state.scenario][this.state.option].desc}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <small>
          Jeśli się teraz ładnie uśmieszniesz do swojego chłopaka i obdarzysz go całusem to będziesz mogła wylosować sobie prezent ;)
        </small>
      </Jumbotron>
    );
  }

  renderIntro = () => {
    const handleOnClick = () => this.setState({page: PAGES.SCENARIO})

    return (
      <Jumbotron style={{height: "100vh", marginBottom: 0, display: 'flex', flexFlow: 'column'}}>
        <h2>Sto lat!</h2>
        <h4>Dziś kończysz 23. rok życia.</h4><br /><br />
        <p>
          W systemie szsesnatkowym jesteś co prawda cały czas nieletnia, ale liczby robią się coraz poważniejsze :)
          Osoby w tym wieku najczęściej muszą podejmować mnóstwo decyzji, które będą miały bardzo istotny wpływ na najbliższe lata ich życia.
          Niestety przed Tobą kolejny trudny wybór: musisz zadecydować gdzie chcesz być zabrana z okazji urodzin przez swojego cudownego chłopaka.
          Ta aplikacja ma na celu ułatwić tę decyzję.
        </p><br />
        <p>
          <Button onClick={handleOnClick} variant="primary">Rozpocznij</Button>
        </p>
      </Jumbotron>
    );
  }

  renderPage = () => {
    if (this.state.page === PAGES.INTRO) {
      return this.renderIntro();
    }
    if (this.state.page === PAGES.SCENARIO) {
      return this.renderScenarioChoice();
    }
    if (this.state.page === PAGES.OPTION) {
      return this.renderOptionChoice();
    }
    if (this.state.page === PAGES.SUMMARY) {
      return this.renderSummary();
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderPage()}
      </div>
    );
  }
}

export default App;

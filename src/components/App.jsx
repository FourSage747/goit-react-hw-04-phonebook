import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactsList } from "./Phonebook/Contacts/ContactsList";
import { Filter } from "./Phonebook/Filter/Filter";
import { Form } from "./Phonebook/Form/Form";
import { Section } from "./Phonebook/Section/Section";

export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const parsedSettings = localStorage.getItem('contacts');
    // if (parsedSettings && JSON.parse(parsedSettings).length) {
    //   this.setState({contacts: JSON.parse(parsedSettings)})
    // }
    if (!parsedSettings) {
      return
    }
    const localstate = JSON.parse(parsedSettings)
    console.log(localstate)
    this.setState({
      contacts: localstate
    })
  }


  createUser = (data) => {
    const  isAlredyContacts = this.state.contacts.find(el => el.name === data.name);
    if (isAlredyContacts) return alert(`${data.name} is alredy in contacts.`)

    const newContacts = {
      ...data,
      id: nanoid(),
    }
    // localStorage.clear()
    this.setState((prev) => ({
      contacts: [newContacts, ...prev.contacts],
    }))
  }

  userFilter = ({target}) => {
    this.setState({ filter: target.value });
  }

  
  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
  
    if (!filter.trim()) {
      return contacts;
    }
  
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  

  handDelete = (id) =>  {
    // if (this.state.filter) {
    //   this.setState((prev) => ({
    //     filter: prev.contacts.filter((el) => el.id !== id),
    //   }));
    // }
      this.setState((prev) => ({
        contacts: prev.contacts.filter((el) => el.id !== id),
      }));
    
  }

  render() {
    const filteredContacts = this.getFilteredContacts();
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 30,
          color: '#010101',
        }}
      >
        
        <Section title="Phonebook">
            <Form createUser={this.createUser}/>
        </Section>
        <Section title="Contacts">
          <Filter title="Find contacts by name" userFilter={this.userFilter}/>
          <ContactsList filteredContacts={filteredContacts} handDelete={this.handDelete} />
        </Section>
      </div>
    );
  }
}

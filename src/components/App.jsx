import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactsList } from "./Phonebook/Contacts/ContactsList";
import { Filter } from "./Phonebook/Filter/Filter";
import { Form } from "./Phonebook/Form/Form";
import { Section } from "./Phonebook/Section/Section";

export const App = () => {
  // state = {
  //   contacts: [
  //     {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
  //     {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
  //     {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
  //     {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  //   ],
  //   filter: '',
  // };
  const [contacts, setContacts] = useState([
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ])
  const [filter, setFilter] = useState('')

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.contacts !== this.state.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }
  useEffect(()=>{
    localStorage.setItem('contacts', JSON.stringify(contacts));
  },[contacts])

  // componentDidMount() {
  //   const parsedSettings = localStorage.getItem('contacts');
  //   if (!parsedSettings) {
  //     return
  //   }
  //   const localstate = JSON.parse(parsedSettings)
  //   console.log(localstate)
  //   this.setState({
  //     contacts: localstate
  //   })
  // }
  useEffect(()=>{
    const parsedSettings = localStorage.getItem('contacts');
    if (parsedSettings) {
      setContacts(JSON.parse(parsedSettings))
    }
  },[])


  const createUser = (name, number) => {
    const  isAlredyContacts = contacts.find(el => el.name === name);
    if (isAlredyContacts) return alert(`${name} is alredy in contacts.`)

    const newContacts = {
      name: name,
      number: number,
      id: nanoid(),
    }
    setContacts((prev) => 
      [newContacts, ...prev]
    )
  }

  const userFilter = ({target}) => {
    setFilter(target.value)
  }

  
  const getFilteredContacts = () => {
    // const { contacts, filter } = this.state;
  
    if (!filter.trim()) {
      return contacts;
    }
  
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  

  const handDelete = (id) =>  {
      // this.setState((prev) => ({
      //   contacts: prev.contacts.filter((el) => el.id !== id),
      // }));
      setContacts((prev) => {
        return prev.filter((el) => el.id !== id)
      })
  }

    const filteredContacts = getFilteredContacts();
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
            <Form createUser={createUser}/>
        </Section>
        <Section title="Contacts">
          <Filter title="Find contacts by name" userFilter={userFilter}/>
          <ContactsList filteredContacts={filteredContacts} handDelete={handDelete} />
        </Section>
      </div>
    );
}

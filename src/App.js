import React,{useState} from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
const { v4: uuid } = require('uuid');

const initialExpenses = [
  {id:uuid(),charge:"rent",amount:1600},
  {id:uuid(),charge:"car",amount:2000},
  {id:uuid(),charge:"food",amount:600}
];

function App() {
  //********state values */
  //all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);
  //single expense
  const [charge, setCharge] = useState('');
  //single amount
  const [amount, setAmount] = useState('');
  //alert
  const [alert,setAlert] = useState({show: false});
  //edit
  const [edit,setEdit] = useState(false);
  //edit item
  const [id, setId] = useState(0);
  
  //********functions */
  //handle charge
  const handleCharge = e => {
    setCharge(e.target.value);
  };

  //handle amount
  const handleAmount = e => {
    setAmount(e.target.value);
  };
  //handle alert
  const handleAlert = ({type, text}) =>{
    setAlert({show: true, type, text});
    setTimeout(()=>{
      setAlert({show:false})
    },3000);
  };

  //handle submit
  const handleSubmit = e => {
    e.preventDefault();
    if(charge !== '' && amount > 0){
      if(edit){
        let tempExpenses = expenses.map(item => {
          return item.id === id?{...item, charge,amount} :item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({type:'success',text:'item edited'});
      }
      else{
      const singleExpense = {id:uuid(),charge,amount};
      setExpenses([...expenses, singleExpense]);
      handleAlert({type:'success',text:'item added'});
      }  
      setCharge('');
      setAmount('');

    }
    else{
      //handle alert called
      handleAlert({type: 'danger', text:`charge can't be empty value and amount
       value has to be bigger than zero`})
    }
  };

  //clear all items
  const clearItems = () =>{
    setExpenses([]);
    handleAlert({type:'danger', text: "all items deleted"});
  };

  //handle delete
  const handleDelete = (id) => {
    
    let tempExpenses = expenses.filter(item => item.id
      !== id);
    setExpenses(tempExpenses);
    handleAlert({type:'danger', text: "item deleted"});

  };

  //handle edit
  const handleEdit = (id) => {
    let expense = expenses.find(item => item.id === id);
    let {charge, amount} = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);


  };



  return <>
  {alert.show && <Alert type={alert.type} text={alert.text}/>}
  <Alert></Alert>
  <h1>Budget Calculator</h1>
  <main className="App">
  <ExpenseForm 
  charge={charge} 
  amount={amount} 
  handleAmount={handleAmount}
  handleCharge={handleCharge} 
  handleSubmit={handleSubmit}
  edit={edit}> 
  </ExpenseForm>
  <ExpenseList expenses={expenses} handleDelete={handleDelete}
   handleEdit={handleEdit} clearItems={clearItems}></ExpenseList>
  </main>
  <h1>
    total spending : <span className="total"> $ {expenses.reduce((acc, curr)=>{
      return (acc += parseInt(curr.amount));
    },0)} </span> 
  </h1>
  
  </>;
  
}

export default App;
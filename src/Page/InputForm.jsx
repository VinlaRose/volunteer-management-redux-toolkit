import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense, addIncome, addSaving } from "../redux/actions"; 
import "../App.css"

function InputForm({income, expense, saving}) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState(null)
  const [category, setCategory] = useState("income"); 

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!description || !amount) {
      return;
    }

   
    if (category === "expense") {
        dispatch(addExpense({ description, amount, category, type }));
    } else if (category === "savings") {
        dispatch(addSaving({ description, amount, category, type }));
    } else if (category === "income") {
      dispatch(addIncome({ description, amount, category, type }));
    }

    
    setDescription("");
    setAmount("");
    setType()
  };

  return (
    
      
    <form className="input-container" onSubmit={handleSubmit}>
    <div className="input-row">
      <div className="input-group">
        <label>Description:</label>
        <input
          className="input-field"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Amount:</label>
        <input
          className="input-field"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Finance:</label>
        <select
          className="input-field"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
            
          <option value="income">Income</option>
          <option value="expense">Expense</option>
          <option value="savings">Savings</option>
        </select>
      </div>
      {
        income && (
            <div className="input-group">
            <label>Income Source:</label>
            <select
              className="input-field"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
                <option value="">Select Income Source</option>
              <option value="Salary">Salary</option>
              <option value="Business">Business</option>
              <option value="Investment returns">Investment returns</option>
            </select>
          </div>
        )
      }
       {
        expense && (
            <div className="input-group">
            <label>Expense Type:</label>
            <select
              className="input-field"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
                 <option value="">Select Expense Type</option>
              <option value="Household">Household</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Food">Food</option>
              <option value="Charity">Charity</option>
            </select>
          </div>
        )
      }
      {
        saving && (
            <div className="input-group">
            <label>Savings Type:</label>
            <select
              className="input-field"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
                 <option value="">Select Savings Type</option>
              <option value="Mutualfunds">Mutualfunds</option>
              <option value="RD/FD">RD/FD</option>
              <option value="Gold">Gold</option>
            </select>
          </div>
        )
      }
    
      <div className="input-group">
        <button type="submit" className="submit-button">
          Add Entry
        </button>
      </div>
    </div>
  </form>
  
    
  );
}

export default InputForm;

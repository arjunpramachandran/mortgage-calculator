import React, { useState } from 'react';
import './App.css'

const MortgageCalculator = () => {
    const [amount, setAmount] = useState("");
    const [rate, setRate] = useState("");
    const [term, setTerm] = useState("");
    const [monthly, setMonthly] = useState(null);
    const [total, setTotal] = useState(null);
    const [totalIntrest, setTotalIntrest] = useState(null);
    const [errors, setErrors] = useState({});
    const [type, setType] = useState('repayment');
    const [visibleSection, setVisibleSection] = useState('results');

    const calculate = (e) => {
        e.preventDefault();
        let formErrors = {};

        if (!amount) formErrors.amount = "Mortgage amount is required.";
        if (!rate) formErrors.rate = "Interest rate is required.";
        if (!term) formErrors.term = "Loan term is required.";

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setErrors({});


        if (type === 'repayment') {
            setVisibleSection('repayment');
        } else if (type === 'interestOnly') {
            setVisibleSection('interestOnly');
        } else {
            setVisibleSection('results');
        }

        const P = parseFloat(amount);
        const r = parseFloat(rate) / 100 / 12;
        const n = parseFloat(term) * 12;

        const monthlyPayment = P * r / (1 - Math.pow(1 + r, -n));
        const totalRepayment = monthlyPayment * n;

        setMonthly(monthlyPayment.toFixed(2));
        setTotal(totalRepayment.toFixed(2));
        setTotalIntrest((totalRepayment - P).toFixed(2));

    };




    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 ">
            <div className="W-100" style={{ maxWidth: '800px', width: '100%' }}>
                <div className="custom-flex shadow bg-white rounded-4 overflow-hidden w-100 m-0">
                    {/* Form Section */}
                    <div className="col-md-6 p-4 ">
                        <div className="d-flex justify-content-between align-items-start mb-4">
                            <h5 className="fw-bold">Mortgage Calculator</h5>
                            <button className="btn btn-link text-dark-emphasis p-0 " onClick={() => {
                                setAmount("");
                                setTerm("");
                                setRate("");
                                setType("repayment");
                                setMonthly(null);
                                setTotal(null);
                                setTotalIntrest(null);
                                setErrors({});
                                setVisibleSection("results");
                            }}>
                                Clear All
                            </button>
                        </div>

                        {/* Amount */}
                        <form onSubmit={calculate} className="needs-validation" noValidate>
                            <div className="mb-3">
                                <label className="form-label">Mortgage Amount</label>
                                <div className="input-group">
                                    <span className="input-group-text input-span">£</span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={amount}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                    />
                                </div>
                            </div>
                            {errors.amount && <p className="custom-error">{errors.amount}</p>}
                            {/* Term & Rate */}
                            <div className="row mb-3">
                                <div className="col-6">
                                    <label className="form-label">Mortgage Term</label>
                                    <div className="input-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={term}
                                            onChange={(e) => setTerm(Number(e.target.value))}
                                        />
                                        <span className="input-group-text input-span">years</span>
                                    </div>
                                    {errors.term && <p className="custom-error">{errors.term}</p>}
                                </div>

                                <div className="col-6">
                                    <label className="form-label">Interest Rate</label>
                                    <div className="input-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={rate}
                                            onChange={(e) => setRate(Number(e.target.value))}
                                        />
                                        <span className="input-group-text input-span">%</span>
                                    </div>
                                    {errors.rate && <p className="custom-error">{errors.rate}</p>}
                                </div>
                            </div>

                            {/* Mortgage Type */}
                            <div className="mb-4">
                                <label className="form-label">Mortgage Type</label>
                                <div className="d-flex flex-column gap-2">
                                    {['repayment', 'interestOnly'].map((option) => (
                                        <div
                                            key={option}
                                            className={`form-check p-2 rounded  d-flex align-items-center ${type === option ? 'border-custom' : 'border border-dark-subtle'
                                                }`}
                                        >
                                            <input
                                                className="custom-radio-input ms-1 me-1 mt-auto mb-auto"
                                                type="radio"
                                                name="mortgageType"
                                                id={option}
                                                value={option}
                                                checked={type === option}
                                                onChange={() => setType(option)}
                                            />
                                            <label className="form-label ms-2 mb-0" htmlFor={option}>
                                                {option === 'repayment' ? 'Repayment' : 'Interest Only'}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Button */}
                            <button type='submit' className="btn bg-lime w-100 fw-bold rounded-pill py-2">
                                <img src="calculator-fill.svg" alt="calc" className='opacity-75 p-1' />
                                Calculate Repayments
                            </button>
                        </form>

                    </div>

                    {/* Results Section */}


                    {visibleSection === 'results' && (
                        <div className="col-md-6 result-border text-white d-flex flex-column justify-content-center align-items-center p-4 color-slate-900" id='results'>
                            <div className="text-center">
                                <img
                                    src="CFCalcHomeImg.png"
                                    alt="illustration"
                                    className="mb-3"
                                    style={{ width: '200px' }}
                                />
                                <h6 className="fw-bold">Results shown here</h6>
                                <p style={{ fontSize: '14px', color: 'rgb(162, 165, 167)' }} >
                                    Complete the form and click “Calculate Repayments” to see what your monthly repayments would be.
                                </p>
                            </div>
                        </div>
                    )}

                    {visibleSection === 'repayment' && (
                        <div className="col-md-6  text-white d-flex flex-column justify-content-center p-4 color-slate-900 " id='repayment' >
                            <h5 className="fw-bold ">Your results</h5>
                            <p style={{ fontSize: '14px', color: 'rgb(162, 165, 167)' }}>
                                Your results are shown below based on the information you provided. To adjust the results,
                                edit the form and click "calculate repayments" again.
                            </p>
                            <div className="d-block border-repay p-3 m-3 rounded-3 bg-dark bg-opacity-75">
                                <h6 className="text-white-50 m-1">Your monthly repayments</h6>
                                <h2 className="fw-bold lime">£ {monthly}</h2>
                                <hr className="border-white opacity-25" />
                                <p className="text-white-50 mb-1">Total you'll repay over the term</p>
                                <h5 className="fw-bold">£ {total}</h5>
                            </div>
                        </div>
                    )}

                    {visibleSection === 'interestOnly' && (
                        <div className="col-md-6 result-border text-white d-flex flex-column justify-content-center p-4 color-slate-900 " id='interestOnly' >
                            <h5 className="fw-bold ">Your results</h5>
                            <p className="text-white-50">
                                Your results are shown below based on the information you provided. To adjust the results,
                                edit the form and click "calculate repayments" again.
                            </p>
                            <div className="d-block border-repay p-3 m-3 rounded-3 bg-dark bg-opacity-75">
                                <h6 className="text-white-50 mb-1">Your monthly Interest</h6>
                                <h2 className="fw-bold lime">£ {(totalIntrest / (term * 12)).toFixed(2)}</h2>
                                <hr className="border-white opacity-25" />
                                <p className="text-white-50 mb-1">Total Interest  over the term</p>
                                <h5 className="fw-bold">£ {totalIntrest}</h5>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MortgageCalculator;

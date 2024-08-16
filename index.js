#! /usr/bin/env node
import inquirer from "inquirer";
// This is a bankAccount class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} successful. Remaining balance: $${this.balance}`);
        }
        else {
            console.log("Insufficient balance");
        }
    }
    // Credit
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`);
    }
    // Check balance
    checkBalance() {
        console.log(`Your current balance is: $${this.balance}`);
    }
}
// This is a class for Customer
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Create bank accounts
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
];
// Create customers
const customers = [
    new Customer("Ali", "Raza", "Male", 40, 5000000, accounts[0]),
    new Customer("Sana", "Shakir", "Female", 40, 5000001, accounts[1]),
    new Customer("Siddique", "Sadaqat", "Male", 40, 5000002, accounts[2])
];
async function service() {
    console.log("Available Account Numbers:");
    customers.forEach(customer => {
        console.log(`- Account Number: ${customer.account.accountNumber} (Holder: ${customer.firstName} ${customer.lastName})`);
    });
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "input",
            message: "Enter your account number:"
        });
        const accountNumber = Number(accountNumberInput.accountNumber); // Convert input to a number
        const customer = customers.find(customer => customer.account.accountNumber === accountNumber);
        if (customer) {
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}`);
            const ans = await inquirer.prompt({
                name: "select",
                type: "list",
                message: "Select an option:",
                choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
            });
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter amount for deposit:"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: 'number',
                        message: "Enter amount for withdraw:"
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting Bank...");
                    return;
            }
        }
        else {
            console.log("Invalid account number");
        }
    } while (true);
}
service();
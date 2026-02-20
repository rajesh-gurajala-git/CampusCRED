import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { loansAPI, offersAPI } from '../services/api';
import { useAuth } from './AuthContext';

const LoanContext = createContext(null);

export const LoanProvider = ({ children }) => {
    const { user } = useAuth();
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lendingOffers, setLendingOffers] = useState([]);

    const fetchLoans = useCallback(async () => {
        try {
            const data = await loansAPI.getAll();
            setLoans(data.map(loan => ({
                ...loan,
                id: loan._id,
                borrowerId: loan.borrower_id?._id || loan.borrower_id,
                lenderId: loan.lender_id?._id || loan.lender_id,
                borrowerName: loan.borrower_id?.name,
                borrowerAddress: loan.borrower_id?.address,
                lenderName: loan.lender_id?.name,
                repaymentDate: loan.repayment_date ? new Date(loan.repayment_date).toLocaleDateString() : 'N/A'
            })));
        } catch (error) {
            console.error("Error fetching loans:", error);
        }
    }, []);

    const fetchOffers = useCallback(async () => {
        try {
            const data = await offersAPI.getAll();
            setLendingOffers(data.map(offer => ({
                ...offer,
                id: offer._id,
                lenderName: offer.lender_id?.name,
                createdAt: new Date(offer.created_at).toLocaleDateString()
            })));
        } catch (error) {
            console.error("Error fetching offers:", error);
        }
    }, []);

    const fetchAll = useCallback(async () => {
        setLoading(true);
        await Promise.all([fetchLoans(), fetchOffers()]);
        setLoading(false);
    }, [fetchLoans, fetchOffers]);

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    const requestLoan = async (loanData) => {
        try {
            // Database Record (Backend will handle smart contract requests when funding happens)
            const data = await loansAPI.create({
                amount: loanData.amount,
                purpose: loanData.purpose,
                description: loanData.description,
                repayment_date: loanData.repaymentDate,
            });

            await fetchLoans();
            return data;
        } catch (error) {
            console.error("Database connection error:", error);
            throw error;
        }
    };

    const createOffer = async (offerData) => {
        try {
            const data = await offersAPI.create(offerData);
            await fetchOffers();
            return data;
        } catch (error) {
            console.error("Error creating offer:", error);
            throw error;
        }
    };

    const fundLoan = async (loanId, lenderUser) => {
        try {
            // Backend Update (Will execute Smart Contract create_loan first)
            await loansAPI.update(loanId, {
                status: 'ACTIVE',
                lender_id: lenderUser.id
            });

            // Update Lender's Active Offer (Optional/Linked)
            const loanAmount = Number(loans.find(l => l.id === loanId)?.amount || 0);
            const myOffer = lendingOffers.find(o => o.lender_id?._id === lenderUser.id || o.lender_id === lenderUser.id);

            if (myOffer && loanAmount > 0) {
                const newAmount = myOffer.amount - loanAmount;
                if (newAmount <= 0) {
                    await offersAPI.delete(myOffer.id);
                } else {
                    await offersAPI.update(myOffer.id, { amount: newAmount });
                }
                await fetchOffers();
            }

            await fetchLoans();
        } catch (error) {
            console.error("Error updating loan status in DB:", error);
            throw error;
        }
    };

    const repayLoan = async (loanId) => {
        try {
            // Backend Update (Will execute Smart Contract repay_loan first)
            await loansAPI.update(loanId, { status: 'REPAID' });
            await fetchLoans();
        } catch (error) {
            console.error("Error updating loan status in DB:", error);
            throw error;
        }
    };

    const getMarketplaceLoans = () => {
        return loans.filter((loan) => loan.status === 'PENDING');
    };

    const getActiveLoans = () => {
        return loans.filter((loan) => loan.status === 'ACTIVE');
    };

    const getUserLoans = (userId) => {
        const loansGiven = loans.filter((loan) =>
            loan.lender_id === userId || loan.lender_id?._id === userId
        );
        const loansTaken = loans.filter((loan) =>
            loan.borrower_id === userId || loan.borrower_id?._id === userId
        );
        return { loansGiven, loansTaken };
    };

    return (
        <LoanContext.Provider
            value={{
                loading,
                fetchLoans,
                loans,
                requestLoan,
                fundLoan,
                repayLoan,
                getMarketplaceLoans,
                getActiveLoans,
                getUserLoans,
                createOffer,
                lendingOffers,
                fetchOffers,
            }}
        >
            {children}
        </LoanContext.Provider>
    );
};

export const useLoan = () => useContext(LoanContext);

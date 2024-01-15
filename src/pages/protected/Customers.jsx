import { useCustomers } from "@/hooks/useCustomer";
import * as PropTypes from "prop-types";

const Customers = () => {
  const customers = useCustomers();

  console.log(customers.data?.data.data);

  const Customer = ({ customer }) => {
    return (
      <>
        <li>{customer.name}</li>
        <li>{customer.mobile}</li>
      </>
    );
  };

  if (customers.isLoading) {
    return <>Loading</>;
  }

  return (
    <>
      {customers.isLoading && <>Loading</>}
      {/* {!customers.data?.data.data && <>Something went wrong</>} */}
      {customers.data?.data?.data.map((customer) => (
        <Customer key={customer.id} customer={customer} />
      ))}
    </>
  );
};

Customers.propTypes = {
  customer: PropTypes.object,
};

export default Customers;

export interface ICustomer {
  custId: number;
  address?: string;
  city?: string;
  custTypeCd: string;
  fedId: string;
  postalCode?: string;
  state?: string;
}
export interface IBusiness {
  incorpDate?: string;
  name: string;
  stateId: string;
  custId: number;
}
export interface IIndividual {
  birthDate: string;
  firstName: string;
  lastName: string;
  custId: number;
}
export interface ICustomerItemProps {
  customer: ICustomer;
  business?: IBusiness | null;
  individual?: IIndividual | null;
}

export interface IBranch {
  branchId: number;
  address?: string;
  city?: string;
  name: string;
  status?: string;
  zipCode?: string;
}
export interface IDepartment {
  deptId: number;
  name: string;
}

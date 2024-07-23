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
export interface IProductType {
  productTypeCd: string;
  name?: string;
}
export interface IProduct {
  productCd: string;
  name: string;
  dateOffered?: string;
  dateRetired?: string;
  productTypeCd?: string;
}
export interface IEmployee {
  empId: number;
  firstName: string;
  lastName: string;
  title?: string;
  startDay: string;
  endTime?: string;
  assignedBranchId?: number;
  deptId?: number;
  superiorEmpId?: number;
}
export interface IAccount {
  accountId: number;
  availBalance?: number;
  closeDate?: string;
  lastActivityDate?: string;
  openDate: string;
  pendingBalance?: number;
  status?: string;
  custId?: number;
  openBranchId: number;
  openEmpId: number;
  productCd: string;
}

import { gql } from 'apollo-server-express';
import { ProductEnums } from './ProductEnums';
import { ProductInputs } from './ProductInputs';
import { ProductTypes } from './ProductTypes';
import { ProductQueries } from './ProductQueries';
import { ProductMutations } from './ProductMutations'; 

export const ProductSchema = gql`
  ${ProductEnums}
  ${ProductInputs}
  ${ProductTypes}
  ${ProductQueries}
  ${ProductMutations} 
`;

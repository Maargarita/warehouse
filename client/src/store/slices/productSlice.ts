import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getProductsList, createProduct, editProduct, removeProduct } from "../../http/productAPI"
import { RootState } from "../store"
import { toast } from "react-toastify"

export const fetchProducts = createAsyncThunk<FetchProductsProps, undefined, {rejectValue: string}>(
    'product/fetchProducts',
    async function(_, {rejectWithValue}) {
      try {
        const response = await getProductsList()
        return response.data
      } catch (error: any) {
        toast.error(error.response.data.message, { position: "top-center"})
        return rejectWithValue(error.message)
      }
    }
)

export const addProduct = createAsyncThunk<ProductObj, object, {rejectValue: string}>(
  'product/createProduct',
  async function(formData: object, {rejectWithValue}) {
      try {
        const response = await createProduct(formData)
        return response.data
      } catch (error: any) {
        toast.error(error.response.data.message, { position: "top-center"})
        return rejectWithValue(error.message)
      }
  }
)

export const changeProduct = createAsyncThunk<ProductObj, changeProductParams,{rejectValue: string}>(
  'product/editProduct',
  async function(data, {rejectWithValue}) {
      try {
        const response = await editProduct(data)
        return response.data
      } catch (error: any) {
        toast.error(error.response.data.message, { position: "top-center"})
        return rejectWithValue(error.message)
      }
  }
)

export const deleteProduct = createAsyncThunk<any, string,{rejectValue: string}>(
  'product/deleteProduct',
  async function(id, {rejectWithValue}) {
      try {
        await removeProduct(id)
        return id
      } catch (error: any) {
        toast.error(error.response.data.message, { position: "top-center"})
        return rejectWithValue(error.message)
      }
  }
)
export interface changeProductParams {
  formData: object, 
  id: string
}

interface FetchProductsProps {
    count: number,
    rows: ProductObj[]
}

export interface ProductObj {
    id: string, 
    article_number: string,
    name: string,
    in_stock: number, 
    warehouse_space: number, 
    createdAt?: string,
    updatedAt?: string,
}

export interface ProductSliseState {
    isLoading: boolean,
    isCloseForm: boolean,
    productsList: ProductObj[],
    count: number
}

const initialState: ProductSliseState = {
    isLoading: false,
    isCloseForm: false,
    productsList: [],
    count: 0
};  

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        seIsCloseForm(state, action) {
          state.isCloseForm = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
          state.isLoading = true
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.isLoading = false
          state.productsList = action.payload.rows
          state.count = action.payload.count
        })
        .addCase(fetchProducts.rejected, (state) => {
          state.isLoading = false
        })

        .addCase (addProduct.pending, (state) => {
          state.isLoading = true
        })
        .addCase (addProduct.fulfilled, (state, action) => {
          state.isCloseForm = true
          state.isLoading = false
          state.productsList.push(action.payload)
          toast.success('Товар успешно создан', { position: "top-center"})
        })
        .addCase (addProduct.rejected, (state) => {
          state.isLoading = false
        })

        .addCase (changeProduct.pending, (state) => {
          state.isLoading = true
        })
        .addCase (changeProduct.fulfilled, (state, action) => {
          state.isCloseForm = true
          state.isLoading = false
          state.productsList = state.productsList.map(product => {
            if (product.id === action.payload.id) {
              return action.payload
            }

            return product
          })
          
          toast.success('Информация о товаре успешно изменена', { position: "top-center"})
        })
        .addCase (changeProduct.rejected, (state) => {
          state.isLoading = false
        })

        .addCase (deleteProduct.pending, (state) => {
          state.isLoading = true
        })
        .addCase (deleteProduct.fulfilled, (state, action) => {
          state.productsList = state.productsList.filter(product => product.id !== action.payload)
          state.isLoading = false
          toast.success('Товар успешно удален', { position: "top-center"})
        })
        .addCase (deleteProduct.rejected, (state) => {
          state.isLoading = false
        })
    }
})

export const selectProduct = (state: RootState) => state.product
export const {seIsCloseForm} = productSlice.actions
export default productSlice.reducer
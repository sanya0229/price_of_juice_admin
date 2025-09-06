/**
 * Examples of API usage based on Price of Juice Admin System documentation
 * This file demonstrates how to use the API service functions
 */

import { authAPI, productsAPI, textAPI, apiUtils } from '../services/api';
import { DEFAULT_VALUES, VALIDATION_RULES } from '../types/api';

// ============================================================================
// AUTHENTICATION EXAMPLES
// ============================================================================

/**
 * Example: Admin Login
 * POST /admin/login
 */
export const exampleAdminLogin = async () => {
  try {
    const credentials = {
      ADM_LOGIN: DEFAULT_VALUES.ADMIN_LOGIN,
      ADM_PSSWRD: DEFAULT_VALUES.ADMIN_PASSWORD
    };

    const response = await authAPI.login(credentials);
    
    // Store the token
    apiUtils.setAuthToken(response.access_token);
    
    console.log('Login successful:', response.user);
    return response;
  } catch (error) {
    console.error('Login failed:', error.message);
    throw error;
  }
};

// ============================================================================
// PRODUCTS API EXAMPLES
// ============================================================================

/**
 * Example: Get All Products
 * GET /admin/products (Public)
 */
export const exampleGetAllProducts = async () => {
  try {
    const products = await productsAPI.getAll();
    console.log('All products:', products);
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error.message);
    throw error;
  }
};

/**
 * Example: Get Product by ID
 * GET /admin/products/:id (Public)
 */
export const exampleGetProductById = async (productId) => {
  try {
    const product = await productsAPI.getById(productId);
    console.log('Product by ID:', product);
    return product;
  } catch (error) {
    console.error('Failed to fetch product:', error.message);
    throw error;
  }
};

/**
 * Example: Create New Product
 * POST /admin/products (Protected)
 */
export const exampleCreateProduct = async () => {
  try {
    const newProduct = {
      insides: [
        {
          product: "Vitamin C",
          activeSubstance: "Ascorbic Acid",
          dosage: "500 mg",
          availability: true,
          price: 25.99,
          id: 1
        },
        {
          product: "Vitamin D3",
          activeSubstance: "Cholecalciferol",
          dosage: "1000 IU",
          availability: true,
          price: 19.99,
          id: 2
        }
      ],
      row: 4
    };

    const createdProduct = await productsAPI.create(newProduct);
    console.log('Product created:', createdProduct);
    return createdProduct;
  } catch (error) {
    console.error('Failed to create product:', error.message);
    throw error;
  }
};

/**
 * Example: Update Product Insides
 * PATCH /admin/products/insides (Protected)
 */
export const exampleUpdateProductInsides = async (rowNumber) => {
  try {
    const updateData = {
      row: rowNumber,
      data: [
        {
          product: "Updated Vitamin C",
          activeSubstance: "Ascorbic Acid",
          dosage: "1000 mg",
          availability: true,
          price: 29.99,
          id: 1
        },
        {
          product: "New Vitamin B12",
          activeSubstance: "Cyanocobalamin",
          dosage: "1000 mcg",
          availability: false,
          price: 15.99,
          id: 10
        }
      ]
    };

    const updatedProduct = await productsAPI.updateInsides(updateData);
    console.log('Product updated:', updatedProduct);
    return updatedProduct;
  } catch (error) {
    console.error('Failed to update product:', error.message);
    throw error;
  }
};

/**
 * Example: Delete Product
 * DELETE /admin/products/:id (Protected)
 */
export const exampleDeleteProduct = async (productId) => {
  try {
    const result = await productsAPI.delete(productId);
    console.log('Product deleted:', result);
    return result;
  } catch (error) {
    console.error('Failed to delete product:', error.message);
    throw error;
  }
};

// ============================================================================
// TEXT API EXAMPLES
// ============================================================================

/**
 * Example: Get Text Content
 * GET /admin/text (Public)
 */
export const exampleGetText = async () => {
  try {
    const textData = await textAPI.get();
    console.log('Text content:', textData);
    return textData;
  } catch (error) {
    console.error('Failed to fetch text:', error.message);
    throw error;
  }
};

/**
 * Example: Update Text Content
 * PATCH /admin/text (Protected)
 */
export const exampleUpdateText = async (newText) => {
  try {
    // Validate text length
    if (newText.length > VALIDATION_RULES.TEXT.MAX_LENGTH) {
      throw new Error(`Text too long. Maximum ${VALIDATION_RULES.TEXT.MAX_LENGTH} characters allowed.`);
    }

    const updateData = {
      text: newText
    };

    const updatedText = await textAPI.update(updateData);
    console.log('Text updated:', updatedText);
    return updatedText;
  } catch (error) {
    console.error('Failed to update text:', error.message);
    throw error;
  }
};

/**
 * Example: Test Text Collection
 * GET /admin/text/test (Public)
 */
export const exampleTestText = async () => {
  try {
    const testResult = await textAPI.test();
    console.log('Text test result:', testResult);
    return testResult;
  } catch (error) {
    console.error('Text test failed:', error.message);
    throw error;
  }
};

// ============================================================================
// UTILITY FUNCTION EXAMPLES
// ============================================================================

/**
 * Example: Check Authentication Status
 */
export const exampleCheckAuth = () => {
  const isAuth = apiUtils.isAuthenticated();
  const token = apiUtils.getAuthToken();
  
  console.log('Is authenticated:', isAuth);
  console.log('Has token:', !!token);
  
  return { isAuthenticated: isAuth, hasToken: !!token };
};

/**
 * Example: Logout
 */
export const exampleLogout = () => {
  apiUtils.clearAuthToken();
  console.log('Logged out successfully');
};

// ============================================================================
// COMPLEX WORKFLOW EXAMPLES
// ============================================================================

/**
 * Example: Complete Product Management Workflow
 */
export const exampleProductWorkflow = async () => {
  try {
    console.log('=== Starting Product Management Workflow ===');
    
    // 1. Get all existing products
    const existingProducts = await exampleGetAllProducts();
    console.log('Step 1: Retrieved existing products');
    
    // 2. Create a new product
    const newProduct = await exampleCreateProduct();
    console.log('Step 2: Created new product');
    
    // 3. Get the created product by ID
    const createdProduct = await exampleGetProductById(newProduct.id);
    console.log('Step 3: Retrieved created product');
    
    // 4. Update the product
    const updatedProduct = await exampleUpdateProductInsides(newProduct.row);
    console.log('Step 4: Updated product');
    
    // 5. Delete the product
    await exampleDeleteProduct(newProduct.id);
    console.log('Step 5: Deleted product');
    
    console.log('=== Product Management Workflow Completed ===');
    return { success: true, message: 'Workflow completed successfully' };
  } catch (error) {
    console.error('Workflow failed:', error.message);
    throw error;
  }
};

/**
 * Example: Complete Text Management Workflow
 */
export const exampleTextWorkflow = async () => {
  try {
    console.log('=== Starting Text Management Workflow ===');
    
    // 1. Get current text
    const currentText = await exampleGetText();
    console.log('Step 1: Retrieved current text');
    
    // 2. Test text collection
    const testResult = await exampleTestText();
    console.log('Step 2: Tested text collection');
    
    // 3. Update text with new content
    const newTextContent = `
      <h1>Welcome to Price of Juice</h1>
      <p>This is an updated text content with HTML formatting.</p>
      <ul>
        <li>High quality products</li>
        <li>Competitive prices</li>
        <li>Excellent service</li>
      </ul>
    `;
    
    const updatedText = await exampleUpdateText(newTextContent);
    console.log('Step 3: Updated text content');
    
    // 4. Verify the update
    const verifiedText = await exampleGetText();
    console.log('Step 4: Verified text update');
    
    console.log('=== Text Management Workflow Completed ===');
    return { success: true, message: 'Workflow completed successfully' };
  } catch (error) {
    console.error('Workflow failed:', error.message);
    throw error;
  }
};

// ============================================================================
// ERROR HANDLING EXAMPLES
// ============================================================================

/**
 * Example: Handle API Errors
 */
export const exampleErrorHandling = async () => {
  try {
    // This will fail because we're not authenticated
    await productsAPI.create({});
  } catch (error) {
    if (error.message.includes('Unauthorized')) {
      console.log('Handling unauthorized error - redirecting to login');
      // Redirect to login page
    } else if (error.message.includes('Bad Request')) {
      console.log('Handling validation error - showing user message');
      // Show validation error to user
    } else if (error.message.includes('Not Found')) {
      console.log('Handling not found error - showing 404 page');
      // Show 404 page
    } else {
      console.log('Handling unknown error:', error.message);
      // Show generic error message
    }
  }
};

// Export all examples
export default {
  // Authentication
  exampleAdminLogin,
  
  // Products
  exampleGetAllProducts,
  exampleGetProductById,
  exampleCreateProduct,
  exampleUpdateProductInsides,
  exampleDeleteProduct,
  
  // Text
  exampleGetText,
  exampleUpdateText,
  exampleTestText,
  
  // Utilities
  exampleCheckAuth,
  exampleLogout,
  
  // Workflows
  exampleProductWorkflow,
  exampleTextWorkflow,
  
  // Error Handling
  exampleErrorHandling,
};

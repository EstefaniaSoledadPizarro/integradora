class productManagerDB {
  async getAllProducts(limit, page, query, sort) {
    try {
      return {
        docs: [],
        page: 1,
        limit: limit ?? 100,
        totalDocs: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
        prevPage: null,
        nextPage: null,
      };
    } catch (error) {
      console.error(error.message);
      throw new Error("Error al buscar los productos");
    }
  }

  async getProductByID(pid) {
    throw new Error(`El producto ${pid} no existe!`);
  }

  async createProduct(product) {
    return { message: "Producto creado correctamente" };
  }

  async updateProduct(pid, productUpdate) {
    return { message: `Producto ${pid} actualizado correctamente` };
  }

  async deleteProduct(pid) {
    return { message: `Producto ${pid} eliminado correctamente` };
  }
}

export { productManagerDB };
'use strict';

/**
 * product service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::product.product', ({ strapi }) => ({
  // Получить продукты по типу таблицы
  async getByTableType(tableType) {
    return await strapi.entityService.findMany('api::product.product', {
      filters: {
        tableType: tableType,
        isActive: true
      },
      sort: { sortOrder: 'asc' }
    });
  },

  // Получить все активные продукты
  async getActive() {
    return await strapi.entityService.findMany('api::product.product', {
      filters: {
        isActive: true
      },
      sort: { sortOrder: 'asc' }
    });
  },

  // Создать продукт с автоматическим sortOrder
  async createWithOrder(data) {
    const maxOrder = await strapi.entityService.findMany('api::product.product', {
      filters: { tableType: data.tableType },
      sort: { sortOrder: 'desc' },
      limit: 1
    });
    
    data.sortOrder = maxOrder.length > 0 ? maxOrder[0].sortOrder + 1 : 0;
    
    return await strapi.entityService.create('api::product.product', {
      data: data
    });
  },

  // Обновить порядок продуктов
  async updateOrder(products) {
    const updatePromises = products.map((item, index) => {
      return strapi.entityService.update('api::product.product', item.id, {
        data: { sortOrder: index }
      });
    });
    
    return await Promise.all(updatePromises);
  },

  // Получить статистику
  async getStats() {
    const stats = {};
    const tableTypes = ['first', 'second', 'third'];
    
    for (const tableType of tableTypes) {
      const count = await strapi.entityService.count('api::product.product', {
        filters: {
          tableType: tableType,
          isActive: true
        }
      });
      stats[tableType] = count;
    }
    
    return stats;
  }
}));

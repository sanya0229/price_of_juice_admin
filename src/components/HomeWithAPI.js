import React, { useState, useEffect } from 'react';
import styles from './css/home.module.css';

import logo_1 from '../assets/images/logo_1.png';
import logo_2 from '../assets/images/logo_2.png';
import instagramIcon from '../assets/images/instagram.png';
import telegramIcon from '../assets/images/telegram.png';
import whatsappIcon from '../assets/images/whatsapp.png';
import emailIcon from '../assets/images/mail.png';

import img_1 from '../assets/images/img_1.png';
import img_2 from '../assets/images/img_2.png';
import img_3 from '../assets/images/img_3.png';
import img_4 from '../assets/images/img_4.png';
import img_5 from '../assets/images/img_5.png';

const HomeWithAPI = () => {
  const [products, setProducts] = useState({
    first: [],
    second: [],
    third: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функция для получения продуктов по типу таблицы
  const fetchProductsByTable = async (tableType) => {
    try {
      const response = await fetch(`http://localhost:1337/api/products/table/${tableType}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data || [];
    } catch (err) {
      console.error(`Error fetching ${tableType} products:`, err);
      return [];
    }
  };

  // Загрузка всех продуктов при монтировании компонента
  useEffect(() => {
    const loadAllProducts = async () => {
      setLoading(true);
      try {
        const [firstTable, secondTable, thirdTable] = await Promise.all([
          fetchProductsByTable('first'),
          fetchProductsByTable('second'),
          fetchProductsByTable('third')
        ]);

        setProducts({
          first: firstTable,
          second: secondTable,
          third: thirdTable
        });
      } catch (err) {
        setError(err.message);
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAllProducts();
  }, []);

  // Функция для отображения таблицы продуктов
  const renderProductTable = (tableData, tableType) => {
    if (loading) {
      return (
        <div className={styles.table_section}>
          <div>Загрузка продуктов...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className={styles.table_section}>
          <div>Ошибка загрузки: {error}</div>
        </div>
      );
    }

    if (!tableData || tableData.length === 0) {
      return (
        <div className={styles.table_section}>
          <div>Нет данных для отображения</div>
        </div>
      );
    }

    return (
      <div className={styles.table_section}>
        <table className={`${styles.product_table} ${tableType === 'second' ? styles.second_table : ''}`}>
          <thead>
            <tr>
              <th>PRODUCT</th>
              <th>ACTIVE SUBSTANCE</th>
              <th>DOSAGE</th>
              <th>AVAILABILITY</th>
              <th>PRICE</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => (
              <tr key={item.id}>
                <td>{item.attributes.product}</td>
                <td>{item.attributes.activeSubstance}</td>
                <td>{item.attributes.volume}</td>
                <td>{item.attributes.stock}</td>
                <td>{item.attributes.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className={styles.desktop_container}>
      {/* Muscle Juice Banner */}
      <div className={styles.muscle_juice_banner}>
        <div className={styles.banner_logo}>
          <img 
            src={logo_1} 
            alt="Muscle Juice Logo" 
            className={styles.logo_image}
          />
        </div>
        
        <div className={styles.banner_text}>
          <p>Мы крутые отправка бла</p>
          <p>боа боа</p>
        </div>
        
        <div className={styles.social_icons}>
          <div className={styles.social_icon}>
            <img 
              src={instagramIcon} 
              alt="Instagram" 
              className={styles.social_icon_image}
            />
          </div>
          <div className={styles.social_icon}>
            <img 
              src={telegramIcon} 
              alt="Telegram" 
              className={styles.social_icon_image}
            />
          </div>
          <div className={styles.social_icon}>
            <img 
              src={whatsappIcon} 
              alt="WhatsApp" 
              className={styles.social_icon_image}
            />
          </div>
          <div className={styles.social_icon}>
            <img 
              src={emailIcon} 
              alt="Email" 
              className={styles.social_icon_image}
            />
          </div>
        </div>
      </div>

      {/* BioCore Header */}
      <div className={styles.header}>
        <div className={styles.logo_container}>
          <div className={styles.logo}>
            <img 
              src={logo_2} 
              alt="BioCore Logo" 
              className={styles.logo_image}
            />
          </div>
        </div>
      </div>

      {/* First Table */}
      {renderProductTable(products.first, 'first')}

      {/* Company Logos Section */}
      <div className={styles.companies_section}>
        <div className={styles.company_logo}>
          <div className={styles.company_icon}>
            <img 
              src={img_1} 
              alt="Hilma Logo" 
              className={styles.company_logo_image}
            />
          </div>
        </div>

        <div className={styles.company_logo}>
          <div className={styles.company_icon}>
            <img
              src={img_2}
              alt="British Dragon Logo"
              className={styles.company_logo_image}
            />
          </div>
        </div>
        
        <div className={styles.company_logo}>
          <div className={styles.company_icon}>
            <img 
              src={img_3}
              alt="British Dragon Logo" 
              className={styles.company_logo_image}
            />
          </div>
        </div>
        
        <div className={styles.company_logo}>
          <div className={styles.company_icon}>
            <img 
              src={img_4}
              alt="Pharmaqo Logo" 
              className={styles.company_logo_image}
            />
          </div>
        </div>

        <div className={styles.company_logo}>
          <div className={styles.company_icon}>
            <img
              src={img_5}
              alt="Pharmaqo Logo"
              className={styles.company_logo_image}
            />
          </div>
        </div>
      </div>

      {/* Second Table */}
      {renderProductTable(products.second, 'second')}

      {/* Third Table */}
      {renderProductTable(products.third, 'third')}
    </div>
  );
};

export default HomeWithAPI;

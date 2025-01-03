import { Website } from '@/types';
import styles from './index.module.css';
import { RootState } from '@/redux';
import { useSelector } from 'react-redux';
const CardContent: React.FC = () => {
  const isDirectLink = useSelector(
    (state: RootState) => state.config.isDirectLink
  );

  const showPopularMain = () => {
    console.log('');
  };

  const initList: Website[] = [
    {
      name: '掘金',
      url: 'https://juejin.cn',
      favicon: 'https://juejin.cn/favicon.ico',
    },
    {
      name: 'GPT',
      url: 'https://chatgpt.com',
      favicon: 'https://chatgpt.com/favicon.ico',
    },
  ];

  const openWebsite = (url: string) => {
    if (isDirectLink) {
      window.location.href = url;
    } else {
      window.open(url);
    }
  };

  return (
    <>
      <div className={styles.websiteContainer} onClick={showPopularMain}>
        <div className={styles.websiteList}>
          {initList.map((item) => (
            <div key={item.name} className={styles.websiteItem} onClick={() => openWebsite(item.url)}>
              <div className={styles.favicon}>
                <img className={styles.favicon} src={item.favicon} alt="" />
              </div>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CardContent;

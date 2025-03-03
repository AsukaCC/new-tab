import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.css';
import { RootState } from '@/redux';
import { setIsAdding } from '@/redux/slice/stateSlice';
import { useState } from 'react';
import { websites } from '@/utils/websiteList';
import { Website } from '@/types';
import { setWebsiteList } from '@/redux/slice/configSlice';

const WebsiteBar: React.FC = () => {
  const dispatch = useDispatch();
  const isAdding = useSelector((state: RootState) => state.state.isAdding);
  const websiteList = useSelector(
    (state: RootState) => state.config.websiteList
  );
  const showPage = useSelector((state: RootState) => state.state.showPage);
  const pageSize = useSelector((state: RootState) => state.config.pageSize);

  const closeWebsiteBar = () => {
    dispatch(setIsAdding(false));
  };

  const [activeTag, setActiveTag] = useState<number>(0);

  const tags = [
    '社交',
    '娱乐',
    '音乐',
    '视频',
    '技术',
    'AI',
    '工具',
    '新闻',
    '美食',
    '旅游',
    '购物',
    '汽车',
    '宠物',
  ];

  const hasWebsite = (url: string) => {
    let has = false;
    websiteList.forEach((websites) => {
      websites.forEach((website) => {
        if (website.url === url) {
          has = true;
        }
      });
    });
    return has;
  };

  const addIcon = (website: Website) => {
    let addPage = showPage;
    const list = JSON.parse(JSON.stringify(websiteList));
    if (!list[addPage]) {
      list[addPage] = [];
    }
    while (list[addPage].length >= pageSize) {
      addPage++;
      if (!list[addPage]) {
        list[addPage] = [];
      }
    }
    list[addPage].push(website);
    dispatch(setWebsiteList(list));
  };

  return (
    <>
      {isAdding && (
        <div className={styles.wrapper} onClick={closeWebsiteBar}></div>
      )}
      <div className={`${styles.websiteBar} ${isAdding ? styles.isOpen : ''}`}>
        <div className={styles.topBar}>
          <svg
            className={`icon ${styles.closeButton}`}
            aria-hidden="true"
            onClick={closeWebsiteBar}>
            <use xlinkHref="#icon-guanbi"></use>
          </svg>
        </div>
        <div className={styles.content}>
          <div className={styles.tagsContainer}>
            {tags.map((tag, index) => (
              <div
                className={`${styles.tagItem} ${
                  activeTag === index ? styles.active : ''
                }`}
                key={tag}
                onClick={() => setActiveTag(index)}>
                {tag}
              </div>
            ))}
          </div>
          <div className={styles.websiteContainer}>
            {websites
              .filter((website) => website.category === tags[activeTag])
              .map((website, index) => (
                <div className={styles.websiteItem} key={index}>
                  <div className={styles.websiteItemIcon}>
                    <img
                      src={`https://api.jiangcheng.site/api/favicon?url=${website.url}`}
                      alt={`${website.name} favicon`}
                    />
                  </div>
                  <div className={styles.websiteItemContent}>
                    <p className={styles.websiteItemName}>{website.name}</p>
                    <p
                      className={styles.websiteItemDescription}
                      title={website.description}>
                      {website.description}
                    </p>
                  </div>
                  {hasWebsite(website.url) ? (
                    <div className={styles.addButton}>已添加</div>
                  ) : (
                    <div
                      className={styles.addButton}
                      onClick={() => addIcon(website)}>
                      添加
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WebsiteBar;

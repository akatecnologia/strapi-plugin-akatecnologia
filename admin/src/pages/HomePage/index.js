/*
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';

const HomePage = () => {
  return (
    <div>
      <h1>{pluginId}&apos;s HomePage</h1>
      <h2>AKA Backup Guide</h2>
      <p>- Call doBackupWithCompress() on cron</p>
      <h2>AKA Migration Guide</h2>
      <p>- Create subfolder inside "./private/migrations" with index.js</p>      
      <p>- Eg.: "./private/migrations/2022-03-11 Atualiza indexes Ativos/index.js"</p>      
    </div>
  );
};

export default memo(HomePage);
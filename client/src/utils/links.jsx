import React from 'react';

import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { MdAdminPanelSettings } from 'react-icons/md';

const links = [
    { text: 'add job', path: '.', icon: <FaWpforms /> },
    { text: 'all jobs', path: 'all-jobs', icon: <MdQueryStats /> },
    { text: 'profile', path: 'profile', icon: <ImProfile /> },
    { text: 'history', path: 'history', icon: <MdAdminPanelSettings /> },
  ];

  export default links;
/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { paramCase } from 'change-case';

// ----------------------------------------------------------------------

export const FOUNDATION_LIST = ['Color', 'Typography', 'Shadows', 'Grid', 'Icons'].map((item) => ({
  name: item,
  href: `/components/${paramCase(item)}`,
  icon: `https://minimal-assets-api.vercel.app/assets/images/components/${paramCase(item)}.png`,
}));

export const MATERIAL_LIST = [
  'Accordion',
  'Alert',
  'Autocomplete',
  'Avatar',
  'Badge',
  'Breadcrumbs',
  'Buttons',
  'Checkbox',
  'Chip',
  'Dialog',
  'List',
  'Menu',
  'Pagination',
  'Pickers',
  'Popover',
  'Progress',
  'Radio Button',
  'Rating',
  'Slider',
  'Snackbar',
  'Stepper',
  'Switch',
  'Table',
  'Tabs',
  'Textfield',
  'Timeline',
  'Tooltip',
  'Transfer List',
  'TreeView',
  'Data Grid',
].map((item) => ({
  name: item,
  href: `/components/${paramCase(item)}`,
  icon: `https://minimal-assets-api.vercel.app/assets/images/components/${paramCase(item)}.png`,
}));

export const EXTRA_LIST = [
  'Chart',
  'Map',
  'Editor',
  'Copy to clipboard',
  'Upload',
  'Carousel',
  'Multi language',
  'Animate',
  'Mega Menu',
  'Form Validation',
  'Lightbox',
  'Image',
  'Label',
  'Scroll',
  'Text Max Line',
  'Navigation Bar',
].map((item) => ({
  name: item,
  href: `/components/${paramCase(item)}`,
  icon: `https://minimal-assets-api.vercel.app/assets/images/components/${paramCase(item)}.png`,
}));

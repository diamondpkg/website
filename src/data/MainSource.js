import semver from 'semver';
import DocsSource from './DocsSource';

const branchBlacklist = new Set([]);
export default new DocsSource({
  id: 'diamond',
  name: 'diamond',
  global: 'diamond',
  repo: 'diamondpkg/diamond',
  defaultTag: 'docs',
  branchFilter: branch => !branchBlacklist.has(branch),
  tagFilter: tag => semver.gte(tag.replace(/^v/, ''), '0.0.0'),
});

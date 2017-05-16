import semver from 'semver';
import DocsSource from './DocsSource';

const branchBlacklist = new Set([]);
export default new DocsSource({
  id: 'unify',
  name: 'Unify',
  global: 'unify',
  repo: 'diamondpkg/unify',
  defaultTag: 'docs',
  branchFilter: branch => !branchBlacklist.has(branch),
  tagFilter: tag => semver.gte(tag.replace(/^v/, ''), '0.0.0'),
});

import { ActionContext } from 'vuex';
import { CurationState } from './index';
import { isValidOrcid } from '@/modules/whyis-dataset';

export default {
  async lookupOrcid({ commit }: ActionContext<CurationState, any>, orcidId: string) {
    const unhyphenated = /^\d{15}(\d|X)$/.test(orcidId);
    if (unhyphenated) {
      orcidId = orcidId.replace(/^\(?(\d{4})\)?(\d{4})?(\d{4})?(\d{3}(\d|X))$/, '$1-$2-$3-$4');
    }

    if (isValidOrcid(orcidId)) {
      // TODO: update the endpoint route name
      // const url = `/api/knowledge/images?uri=http://orcid.org/${orcidId}&view=describe`;
      const url = `/api/knowledge/instance?uri=http://orcid.org/${orcidId}`;
      const response = await fetch(url, {
        method: 'GET',
      });
      if (response?.statusText !== 'OK') {
        const snackbar = {
          message: (response as any).message || 'Something went wrong while fetching orcid data',
          duration: 5000,
        };
        return commit('setSnackbar', snackbar, { root: true });
      }

      const responseData = await response.json();
      const cpResult = responseData.filter(
        (entry: any) => entry['@id'] === `http://orcid.org/${orcidId}`
      );
      if (cpResult.length) {
        return commit('setOrcidData', cpResult[0]);
      } else {
        // No results were returned
        return commit('setOrcidData', 'invalid');
      }
    } else {
      // Incorrect format
      return commit('setOrcidData', 'invalid');
    }
  },

  async lookupDoi({ commit }: ActionContext<CurationState, any>, inputDoi: string) {
    const url = `/api/knowledge/getdoi/${inputDoi}`;
    const response = await fetch(url, {
      method: 'GET',
    });
    if (response?.statusText !== 'OK') {
      const snackbar = {
        message: (response as any).message || 'Something went wrong while fetching DOI data',
        duration: 5000,
      };
      return commit('setSnackbar', snackbar, { root: true });
    }
    const responseData = await response.json();
    return commit('setDoiData', responseData);
  },

  async searchRor(
    { commit }: ActionContext<CurationState, any>,
    payload: { query?: string; id?: string }
  ) {
    const { query, id } = payload;
    let url: string;
    if (query) url = `/api/knowledge/ror?query=${query}`;
    else if (id) url = `/api/knowledge/ror?id=${id}`;
    else {
      const snackbar = {
        message: 'Missing parameter from ROR search',
        duration: 10000,
      };
      return commit('setSnackbar', snackbar, { root: true });
    }
    const response = await fetch(url, {
      method: 'GET',
    });
    if (response?.statusText !== 'OK') {
      const snackbar = {
        message: (response as any).message || 'Something went wrong while fetching ROR data',
        duration: 5000,
      };
      return commit('setSnackbar', snackbar, { root: true });
    }
    const responseData = await response.json();
    commit('setRorData', responseData);
    return responseData;
  },

  async cacheNewEntityResponse({ commit }: ActionContext<CurationState, any>, payload: any) {
    // This action is called by the SddForm component but the implementation
    // would depend on the specific caching mechanism used in the application
    // For now, we'll just log it
    console.log('Caching new entity response:', payload);
    return payload;
  },

  async fetchDatasetThumbnail({ commit }: ActionContext<CurationState, any>, thumbnailId: string) {
    const url = `/api/knowledge/instance?uri=${encodeURIComponent(thumbnailId)}`;
    const response = await fetch(url, {
      method: 'GET',
    });
    if (response?.statusText !== 'OK') {
      throw new Error('Failed to fetch dataset thumbnail');
    }
    const responseData = await response.json();
    return responseData;
  },
};

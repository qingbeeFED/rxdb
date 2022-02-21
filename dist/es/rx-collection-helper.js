import { getDefaultRxDocumentMeta } from './util';
/**
 * fills in the default data.
 * This also clones the data.
 */

/**
 * Creates the storage instances that are used internally in the collection
 */
export var createRxCollectionStorageInstances = function createRxCollectionStorageInstances(collectionName, rxDatabase, storageInstanceCreationParams, instanceCreationOptions) {
  try {
    storageInstanceCreationParams.multiInstance = rxDatabase.multiInstance;
    return Promise.resolve(Promise.all([rxDatabase.storage.createStorageInstance(storageInstanceCreationParams), rxDatabase.storage.createKeyObjectStorageInstance({
      databaseName: rxDatabase.name,

      /**
       * Use a different collection name for the local documents instance
       * so that the local docs can be kept while deleting the normal instance
       * after migration.
       */
      collectionName: getCollectionLocalInstanceName(collectionName),
      options: instanceCreationOptions,
      multiInstance: rxDatabase.multiInstance
    })])).then(function (_ref) {
      var storageInstance = _ref[0],
          localDocumentsStore = _ref[1];
      return {
        storageInstance: storageInstance,
        localDocumentsStore: localDocumentsStore
      };
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
export function fillObjectDataBeforeInsert(collection, data) {
  var useJson = collection.schema.fillObjectWithDefaults(data);
  useJson = collection.schema.fillPrimaryKey(useJson);
  useJson._meta = getDefaultRxDocumentMeta();
  return useJson;
}
export function getCollectionLocalInstanceName(collectionName) {
  return collectionName + '-local';
}
//# sourceMappingURL=rx-collection-helper.js.map
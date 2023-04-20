export interface IProvider {
  fetchOffers: () => Promise<void>
}

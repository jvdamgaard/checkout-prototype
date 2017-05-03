<template>
  <div class="Footer">
    <div class="Footer-row Footer-usp">
      <div class="Footer-column">
        <img src="https://jvdamgaard.github.io/checkout-prototype/images/gurantee.svg"> 5 dages friskhedsgaranti
      </div>
      <div class="Footer-column">
        <img src="https://jvdamgaard.github.io/checkout-prototype/images/delivery.svg"> Altid gratis levering, gaveæske og kort
      </div>
      <div class="Footer-column">
        <img src="https://jvdamgaard.github.io/checkout-prototype/images/flower.svg"> Den buket du ser = den buket du giver
      </div>
    </div>
    <div class="Footer-row">
      <div class="Footer-column">
        <p class="Footer-header">Brug for hjælp med bestillingen?</p>
        <p><strong>Ring til os på 87 78 30 31</strong></p>
        <p>Mandag til fredag: 08:30 - 18:00<br>
        Lørdag til søndag: 10:00 - 16:00<br>
        Helligdage: Lukket</p>
      </div>
      <div class="Footer-column Footer-payment">
        <p class="Footer-header">Betalingsmuligheder</p>
        <p>
          <img src="https://jvdamgaard.github.io/checkout-prototype/images/dankort.png">
          <img src="https://jvdamgaard.github.io/checkout-prototype/images/visa.png">
          <img src="https://jvdamgaard.github.io/checkout-prototype/images/mastercard.png">
          <img src="https://jvdamgaard.github.io/checkout-prototype/images/mobilepay.png">
        </p>
      </div>
      <div class="Footer-column">
        <p class="Footer-header" style="text-decoration: underline">Tilbage til shoppen</p>
      </div>
    </div>
    <div class="Footer-row Footer-row--small">
      <div class="Footer-column">
        Copyright © 2017, flowr, Dansk Supermarked
      </div>
      <div class="Footer-column Footer-links">
        <span>Datapolitik</span><span>Handelsbetingelser</span>
      </div>
    </div>
  </div>
</template>

<style>
  .Footer {
    font-size: 0.8125rem;
    color: var(--color-grey);
    margin-top: 8rem;
  }
  .Footer p {
    margin-bottom: 0.5rem;
  }
  .Footer-row {
    display: flex;
    flex-wrap: wrap;
    padding: 0 3.5rem;
    margin-top: 2px;
    background-color: var(--color-white);
  }
  .Footer-column {
    margin: 0 0.5rem;
    padding: 4rem 0;
    flex: 1;
  }
  .Footer-row--small .Footer-column {
    padding: 1rem 0;
  }
  .Footer-usp img {
    display: inline-block;
    vertical-align: middle;
    margin-right: 0.5rem;
  }
  .Footer-header {
    margin-bottom: 1rem !important;
    font-weight: 700;
    text-transform: uppercase;
  }
  .Footer-payment img {
    margin-right: 1rem;
  }
  .Footer-links {
    text-align: right;
  }
  .Footer-links span {
    text-decoration: underline;
    margin-left: 2rem;
  }
</style>

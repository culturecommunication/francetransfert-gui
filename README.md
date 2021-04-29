# FranceTransfert Upload / Download Module

# Angular i18n

ng xi18n --i18n-locale fr --out-file ../core/src/lib/locale/messages.fr.xlf

ng xi18n --i18n-locale en --out-file ../core/src/lib/locale/messages.en.xlf

ng build --prod --aot --vendor-chunk --common-chunk --delete-output-path --buildOptimizer --extractCss --base-href=/upload/fr/ --deployUrl=/upload/fr/ --project=upload --configuration=fr

ng build --prod --aot --vendor-chunk --common-chunk --delete-output-path --buildOptimizer --extractCss --base-href=/upload/en/ --deployUrl=/upload/en/ --project=upload --configuration=en

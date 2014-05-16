package com.seanshubin.backbone.sample.core.http

object HttpParseUtil {
  def parseContentType(rawContentType:String):String = {
    val semicolonIndex = rawContentType.indexOf(';')
    if(semicolonIndex == -1) rawContentType
    else rawContentType.substring(0, semicolonIndex)
  }
}

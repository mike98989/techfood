<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HygieneRounds extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function user(): BelongsTo{
        return $this->belongsTo(User::class, 'user_id','id');
    }

    public function deviation_type(): HasOne{
        return $this->hasOne(HygieneRoundsDeviationTypes::class, 'id','deviation_type_id');
    }

    public function section(): HasOne{
        return $this->hasOne(HygieneRoundsSections::class, 'id','section_id');
    }
    public function location(): HasOne{
        return $this->hasOne(HygieneRoundsLineTypes::class, 'id','location_id');
    }
    public function risk_category(): HasOne{
        return $this->hasOne(HygieneRoundsRiskCategories::class, 'id','risk_category_id');
    }

    public function deviation_code(): HasOne{
        return $this->hasOne(HygieneRoundsDeviationCodes::class, 'id','deviation_code_id');
    }

    public function product(): HasOne{
        return $this->hasOne(HygieneRoundsProducts::class, 'id','product_id');
    }

    public function danger(): HasOne{
        return $this->hasOne(HygieneRoundsDangerTypes::class, 'id','danger_id');
    }
}
